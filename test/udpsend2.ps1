
  
###   
#  Start of Script   
##   
  
# Define port and target IP address   
$Port = 514  
$IP = "127.0.0.1"   
$Address = [system.net.IPAddress]::Parse( $IP )  
$csv = ".\payload.csv"  
$IPS = import-csv $csv
foreach ($IPaddress in $IPS){
    start-sleep -s 3
    $bot = $ipaddress.ipaddress
      
      
    # Create IP Endpoint   
    $End = New-Object System.Net.IPEndPoint $address , $port   
      
    # Create Socket   
    $Saddrf    = [System.Net.Sockets.AddressFamily]::InterNetwork  
    $Stype    = [System.Net.Sockets.SocketType]::Dgram  
    $Ptype     = [System.Net.Sockets.ProtocolType]::UDP  
    $Sock      = New-Object System.Net.Sockets.Socket $saddrf , $stype , $ptype   
    $Sock.TTL = 26  
      
    # Connect to socket   
    $sock.Connect( $end )  
      
    # Create encoded buffer   
    $Enc      = [System.Text.Encoding]::UTF8  
    $Message = $bot
    $Buffer   = $Enc.GetBytes( $Message )  
      
    # Send the buffer   
    $Sent   = $Sock.Send( $Buffer )  
    "{0} characters sent to: {1} " -f $Sent , $IP   
    "Message is:"   
    $Message   
    # End of Script
}
