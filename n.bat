@setlocal
@echo off
pushd %~dp0
:START
nodemon src/index
goto START
popd
endlocal