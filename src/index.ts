import { execSync } from "child_process"

const title = "タイトル"
const msg = "通知メッセージ"

const script = `
$ProgressPreference = 'SilentlyContinue'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$n = New-Object System.Windows.Forms.NotifyIcon
$n.Icon = [System.Drawing.SystemIcons]::Information
$n.BalloonTipIcon = 'Info'
$n.BalloonTipTitle = '${title}'
$n.BalloonTipText = '${msg}'
$n.Visible = $true
$n.ShowBalloonTip(5000)

$end = (Get-Date).AddSeconds(5)
while ((Get-Date) -lt $end) {
    [System.Windows.Forms.Application]::DoEvents()
    Start-Sleep -Milliseconds 100
}
$n.Dispose()
`

const encoded = Buffer.from(script, "utf16le").toString("base64")
execSync(`powershell -NoProfile -EncodedCommand ${encoded}`)