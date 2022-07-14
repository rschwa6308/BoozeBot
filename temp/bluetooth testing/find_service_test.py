import bluetooth

from pprint import pprint

TARGET_ADDR = "1E:41:46:00:00:C2"


services = bluetooth.find_service(address=TARGET_ADDR)

for service in services:
  if not service["name"]: continue
  print(service["name"].decode())