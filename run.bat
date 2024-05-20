@setlocal
@echo off
pushd %~dp0
:START
node src/index
goto START
popd
endlocal