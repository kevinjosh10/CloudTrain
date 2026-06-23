import urllib.request
import json
import sys

def main():
    url = "https://api.github.com/repos/kevinjosh10/CloudTrain/actions/runs"
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "Mozilla/5.0")
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
    except Exception as e:
        print(f"Failed to fetch runs: {e}")
        return
        
    if not data['workflow_runs']:
        print("No workflow runs found.")
        return
        
    latest_run = data['workflow_runs'][0]
    print(f"Latest run ID: {latest_run['id']} - Status: {latest_run['status']} - Conclusion: {latest_run['conclusion']}")

    jobs_url = latest_run['jobs_url']
    req = urllib.request.Request(jobs_url)
    req.add_header("User-Agent", "Mozilla/5.0")
    try:
        with urllib.request.urlopen(req) as response:
            jobs_data = json.loads(response.read().decode())
    except Exception as e:
        print(f"Failed to fetch jobs: {e}")
        return

    for job in jobs_data['jobs']:
        print(f"Job: {job['name']} - Conclusion: {job['conclusion']}")
        if job['conclusion'] == 'failure':
            print(f"Attempting to fetch logs for failed job: {job['name']}")
            log_url = f"https://api.github.com/repos/kevinjosh10/CloudTrain/actions/jobs/{job['id']}/logs"
            try:
                req = urllib.request.Request(log_url)
                req.add_header("User-Agent", "Mozilla/5.0")
                with urllib.request.urlopen(req) as log_response:
                    log_text = log_response.read().decode('utf-8')
                    print("================ LOG START ================")
                    lines = log_text.splitlines()
                    for line in lines[-100:]:
                        print(line)
                    print("================ LOG END ================")
            except Exception as e:
                print(f"Could not fetch logs: {e}")

if __name__ == '__main__':
    main()
