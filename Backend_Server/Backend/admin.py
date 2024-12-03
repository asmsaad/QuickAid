from django.contrib import admin
from .models import *

admin.site.register(request_status)
admin.site.register(priority)
admin.site.register(departments)
admin.site.register(designation)
admin.site.register(user_roles)
admin.site.register(user_info)
admin.site.register(employee_supervisors)
admin.site.register(genders)
admin.site.register(cities)
admin.site.register(buildings)
admin.site.register(locations)
admin.site.register(domains)
admin.site.register(sub_domains)
admin.site.register(services)
admin.site.register(urgency)
admin.site.register(request_view_status)







admin.site.register(access_level)
admin.site.register(domain_minimum_access_level)
admin.site.register(admin_access_priority)
admin.site.register(admin_access)
admin.site.register(all_requests)
admin.site.register(all_request_status_flow)
admin.site.register(notification_token)
