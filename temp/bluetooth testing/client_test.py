import bluetooth

TARGET_ADDR = "1E:41:46:00:00:C2"


port = 1

sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
sock.connect((TARGET_ADDR, port))

sock.send("hello!!")

sock.close()