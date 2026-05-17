import { execSync } from "child_process"
/**
 * default class
 */
export default class AnnoyingNotify {
    /**
     * baseNotify
     */
    notify(title: string = "none", msg: string = "none"): void {
        const tTitle = title
        const tMsg = msg

        const script = `
            $ProgressPreference = 'SilentlyContinue'
            Add-Type -AssemblyName System.Windows.Forms
            Add-Type -AssemblyName System.Drawing
            $n = New-Object System.Windows.Forms.NotifyIcon
            $n.Icon = [System.Drawing.SystemIcons]::Information
            $n.BalloonTipIcon = 'Info'
            $n.BalloonTipTitle = '${tTitle}'
            $n.BalloonTipText = '${tMsg}'
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
    }
}