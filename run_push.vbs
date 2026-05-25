Set objShell = CreateObject("WScript.Shell")
strFolder = "C:\Users\mmora\Desktop\Marta Morales — Product Designer_files"
strOut = strFolder & "\push_output.txt"
strCmd = "cmd /c cd /d """ & strFolder & """ && git push origin main > """ & strOut & """ 2>&1"
objShell.Run strCmd, 0, True
