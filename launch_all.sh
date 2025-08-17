#!/bin/bash
echo "[✓] Launching CRAIViz orchestration..."

# Launch Flask server in Windows terminal
powershell.exe -ExecutionPolicy Bypass -File C:\craiviz\launch_server.ps1

# Launch WSL terminal to run modulate.sh
wt.exe -w 0 nt -d . bash -c "./modulate.sh"
