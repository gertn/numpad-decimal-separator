@echo off
start iexplore http://localhost:%1/capture
start firefox http://localhost:%1/capture
start chrome http://localhost:%1/capture
start safari http://localhost:%1/capture

"C:\Program Files (x86)\Opera\opera.exe" http://localhost:%1/capture