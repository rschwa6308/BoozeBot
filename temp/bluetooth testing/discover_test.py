# simple inquiry example
import bluetooth

TARGET_NAME = "Notepad_K10"
TARGET_ADDR = None


nearby_devices = bluetooth.discover_devices(lookup_names=True)
print(f"Found {len(nearby_devices)} devices.")

for addr, name in nearby_devices:
	print(f"  {addr} - {name}")
	if name == TARGET_NAME:
		TARGET_ADDR = addr


print(TARGET_ADDR)

# => "1E:41:46:00:00:C2"
