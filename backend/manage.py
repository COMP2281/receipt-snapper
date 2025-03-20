#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

import dotenv


def main():
    # Ensure the logs folder and log file exist
    logs_folder_path = os.path.join(os.path.dirname(__file__), 'logs')
    os.makedirs(logs_folder_path, exist_ok=True)
    log_file_path = os.path.join(logs_folder_path, 'django.log')
    if not os.path.exists(log_file_path):
        print(f'Creating log file at {log_file_path}')
        with open(log_file_path, 'w') as log_file:
            log_file.write('')
            log_file.close()
    """Run administrative tasks."""
    dotenv.load_dotenv()
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.base")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    if len(sys.argv) > 1 and sys.argv[1] == "runserver":
        port = os.getenv("PORT", "8000")
        execute_from_command_line([sys.argv[0], 'runserver', f'0.0.0.0:{port}'])
    else:
        execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
