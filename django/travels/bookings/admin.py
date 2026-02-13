# from django.contrib import admin
# from .models import Bus, Seat

# # Register your models here.


# class BusAdmin(admin.ModelAdmin):
#     list_dispaly = ('bus_name', 'number', 'origin', 'destination')

# admin.site.register(Bus, BusAdmin)
# admin.site.register(Seat)

from django.contrib import admin
from .models import Bus, Seat, Booking

@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = ('bus_name', 'number', 'origin', 'destination')

@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('bus', 'seat_number', 'is_booked')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'bus', 'seat', 'booking_time')

