$frontendPath = "C:\CRAUDIOVIZAI Website files"
$ftpServer = "ftp://ftp.hostinger.com/public_html/"
$ftpUser = "your-ftp-username"
$ftpPass = "your-ftp-password"
$LogFile = "logs/deploy.log"

Add-Content -Path $LogFile -Value "`n=== Deploy Started: $(Get-Date) ==="

function Upload-FileToFTP {
    param (
        [string]$localPath,
        [string]$remotePath
    )
    try {
        $ftpUri = $ftpServer + $remotePath
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
        $ftpRequest.UseBinary = $true
        $ftpRequest.UsePassive = $true
        $fileContent = [System.IO.File]::ReadAllBytes($localPath)
        $ftpStream = $ftpRequest.GetRequestStream()
        $ftpStream.Write($fileContent, 0, $fileContent.Length)
        $ftpStream.Close()
        Write-Host "✅ Uploaded: $localPath → $remotePath"
        Add-Content -Path $LogFile -Value "Uploaded: $localPath → $remotePath"
    } catch {
        Write-Host "❌ Failed: $localPath" -ForegroundColor Red
        Add-Content -Path $LogFile -Value "Failed: $localPath → $remotePath"
    }
}

Get-ChildItem -Path $frontendPath -Recurse -File | Where-Object {
    $_.FullName -notmatch "\\\.git\\" -and
    $_.Name -notmatch "^\.DS_Store$" -and
    $_.Name -notmatch "^Thumbs\.db$"
} | ForEach-Object {
    $relativePath = $_.FullName.Replace($frontendPath, "").TrimStart("\", "/").Replace("\", "/")
    Upload-FileToFTP -localPath $_.FullName -remotePath $relativePath
}

Write-Host "`n🎯 Frontend deploy complete." -ForegroundColor Cyan
Add-Content -Path $LogFile -Value "Deploy complete."
