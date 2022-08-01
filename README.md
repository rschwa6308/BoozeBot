# BoozeBot 3000!

TODO: description

## Bluetooth Protocol

PumpController to Kiosk:
 - Request Order Start
 - Notify Order Started (with ETA)
 - Notify Order Finished
 - Notify Order Canceled

Kiosk to PumpController:
 - Signal Order Start (with order details)
 - Signal Manual Control
 - Notify UI State (for green button LED)


```JSON
{
  message_type: string,
  message_content: request_order_start_content | … | …
}
```
