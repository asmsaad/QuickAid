from django.shortcuts import render
from django.http import HttpResponse
from .models import *

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from rest_framework import status
from .models import designation
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt


# def home(request):
#     return HttpResponse("Yoooooooooo I am working Fine!")

# class PopulateDesignationsView(APIView):
#     def post(self, request, *args, **kwargs):
#         # List of designations to add
#         designations = [
#                         "Assistant Engineer",
#                         "Assistant Engineering Program Manager",
#                         "Assistant Program Manager",
#                         "Assistant Technical Manager",
#                         "Director",
#                         "Engineer",
#                         "Executive",
#                         "Junior Executive",
#                         "Manager",
#                         "Member Of Business Team",
#                         "Member of Technical Staff",
#                         "Officer",
#                         "Program Manager",
#                         "Senior Director",
#                         "Senior Engineer",
#                         "Senior Executive",
#                         "Senior Manager",
#                         "Senior Officer",
#                         "Senior Program Manager",
#                         "Senior Technical Manager",
#                         "Store Coordinator",
#                         "Technical Manager",
#                         "Trainee Engineer",
#                         "VP",
#                         "Well-being Counselor"
#                     ]

#         # Add designations to the database
#         added_designations = []
#         for des in designations:
#             obj, created = designation.objects.get_or_create(designation=des)
#             if created:
#                 added_designations.append(des)

#         return Response(
#             {"message": "Designations added successfully!", "added": added_designations},
#             status=200,
#         )
 
        
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.utils import timezone
# from .models import user_info, genders

# class PopulateUserInfoView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_data_list = request.data.get('data', [])
        
#         # Iterate over each user's data
#         for user_data in user_data_list:
#             try:
#                 # Try to get the existing user by empid
#                 user_info_obj, created = user_info.objects.get_or_create(empid=user_data['empid'])

#                 # Only update the user if it was newly created
#                 if created:
#                     gender = self.get_gender(user_data['gender'])  # Get gender instance safely

#                     # Update user info with provided data
#                     user_info_obj.name = user_data['name']
#                     user_info_obj.email = user_data['email']
#                     user_info_obj.gender = gender
#                     user_info_obj.phone_number = user_data.get('phone', '')

#                     user_info_obj.joining_date = user_data['doj']

#                     user_info_obj.create_on = timezone.now()
#                     user_info_obj.save()

#             except Exception as e:
#                 # You can log the error here instead of returning immediately.
#                 # logging.exception(f"Error processing empid {user_data['empid']}: {str(e)}")
#                 return Response({'error': str(e)}, status=400)

#         return Response({'Success': 'Succeeded'}, status=200)

#     def get_gender(self, gender_name):
#         """Retrieve or create gender if not found."""
#         try:
#             gender = genders.objects.get(gender=gender_name)
#         except genders.DoesNotExist:
#             # Handle the case where gender doesn't exist, possibly create it or return a default
#             gender = None  # Or handle it as needed, e.g., create a default gender
#         return gender





@api_view(["POST"])
def get_managers_by_empid(request):
    
    try:
        empid = request.data.get('empid')
        
        if not empid:
            return Response({'error':'empid is required'}, status=400)
        
        try:
            employee = user_info.objects.get(empid = empid)
        except user_info.DoesNotExist:
            return Response({'error':'user does not exist'}, status=401)
        
        managers_obj = employee_supervisors.objects.get(employee=employee)
        managers = managers_obj.supervisors.all()
        
        data = {manager.empid: manager.name for manager in managers}
        
        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)},status=405)
    
    
@api_view(["POST"])
def create_new_request(request):
    try:
        request_by = request.data.get('requested_by')
        requestor_departments = request.data.get('departments', [])
        managers = request.data.get('managers', [])
        acknowledge = request.data.get('acknowledge', [])
        sub_domain = request.data.get('sub_domain')
        service = request.data.get('service')
        urgency_id = request.data.get('urgency')
        location = request.data.get('location')
        desk_number = request.data.get('desk_number')
        note = request.data.get('note')
        
        if not request_by:
            return Response({'error':'request_by empid required'}, status=400)
        if not requestor_departments:
            return Response({'error':'requestor departments can not be empty'}, status=400)
        if not managers:
            return Response({'error':'managers empid required'}, status=400)
        if not acknowledge:
            return Response({'error':'acknowledge empid required'}, status=400)
        if not sub_domain:
            return Response({'error':'sub_domain is required'}, status=400)
        if not service:
            return Response({'error':'service is required'}, status=400)
        if not location:
            return Response({'error':'location is required'}, status=400)
        if not desk_number:
            return Response({'error':'desk_number is required'}, status=400)
        if not urgency_id:
            return Response({'error':'urgency is required'}, status=400)
        
        try:
            request_by_obj = user_info.objects.get(empid = request_by)
        except user_info.DoesNotExist:
            return Response({'error':'user does not found'}, status=404)
        
        managers_obj = user_info.objects.filter(empid__in = managers)
        acknowledge_obj = user_info.objects.filter(empid__in = acknowledge)
        dept_obj = departments.objects.filter(dept_id__in = requestor_departments)
        
        try:
            sub_domain_obj = sub_domains.objects.get(sub_domain_id = sub_domain)
        except domains.DoesNotExist:
            return Response({'error':'domain does not found'}, status=404)
        
        try:
            service_obj = services.objects.get(service_id = service)
        except services.DoesNotExist:
            return Response({'error':'service does not found'}, status=404)
        
        try:
            location_obj = locations.objects.get(location_id = location)
        except locations.DoesNotExist:
            return Response({'error':'location does not found'}, status=404)
        
        try:
            urgency_obj = urgency.objects.get(urgency_id = urgency_id)
        except urgency.DoesNotExist:
            return Response({'error':'urgency does not found'}, status=404)
        
        
        new_request = all_requests.objects.create(
            
            request_by = request_by_obj,
            domain = sub_domain_obj.domain,
            sub_domain = sub_domain_obj,
            service = service_obj,
            location = location_obj,
            desk_number = desk_number,
            urgency = urgency_obj,
            status = request_status.objects.get(status = 'Requested'),
            note = note
        )
        
        new_request.manager.set(managers_obj)
        new_request.acknowledge.set(acknowledge_obj)
        new_request.requestor_department.set(dept_obj)
        
        new_request_id = new_request.request_id
        
        all_request_status_flow.objects.create(
            request = all_requests.objects.get(request_id = new_request_id),
            status = request_status.objects.get(status = 'Requested'),
            updated_by = request_by_obj,
        )
        
        request_view_status.objects.create(request = all_requests.objects.get(request_id = new_request_id))
        
        return Response({'message': 'Request created successfully!', 'request_id': new_request.request_id}, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)



@api_view(["POST"])
def get_all_employee_info(request):
    
    try:
        all_user_obj = user_info.objects.all()
        
        data = {}
        for user in all_user_obj:
            departments_obj = user.department.all()
            data[user.empid]={
                'name' : user.name,
                'department': {dept.dept_id : dept.department for dept in departments_obj},
            } 
        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
    
@api_view(["POST"])
def get_all_domain(request):
    try:
        all_domain_obj = domains.objects.all()
        
        data = {dom.domain_id : dom.domain for dom in all_domain_obj}

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
@api_view(["POST"])
def get_all_sub_domain(request):
    try:
        all_domain_obj = sub_domains.objects.all()
        
        data = {dom.sub_domain_id : f'{dom.domain.domain}-{dom.sub_domain}' for dom in all_domain_obj}

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
    
@api_view(["POST"])
def get_all_urgency(request):
    try:
        all_urgency_obj = urgency.objects.all()
        
        data = {var.urgency_id : var.urgency for var in all_urgency_obj}

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
@api_view(["POST"])
def get_all_request_status(request):
    try:
        all_request_status_obj = request_status.objects.all()
        
        data = [{"status_id":var.status_id, "name": var.status, "color": var.color} for var in all_request_status_obj]

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
    
@api_view(["POST"])
def get_all_service(request):
    subdomain = request.data.get('subdomain')
    
    if not subdomain:
        return Response({'error': 'subdomain is required'}, status=400)
    
    try:
        try:
            subdomain_obj = sub_domains.objects.get(sub_domain_id=subdomain)
        except sub_domains.DoesNotExist:
            return Response({'error': 'sub_domain does not exist'}, status=404)
        
        all_service_obj = services.objects.filter(sub_domain=subdomain_obj)
        
        data = {var.service_id: var.service for var in all_service_obj}

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def get_all_cities(request):
    try:
        all_cities_obj = cities.objects.all()
        
        data = {var.city_id : var.city for var in all_cities_obj}

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
@api_view(["POST"])
def get_all_building(request):
    try:
        all_building_obj = buildings.objects.all()
        
        data = {}    
        for building in all_building_obj:
            data[building.building_id] = {

                "building_name": building.building,
                "city":{ building.city.city_id :building.city.city }
            } 

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
@api_view(["POST"])
def get_all_loactions(request):
    try:
        all_loactions_obj = locations.objects.all()
        
        data = {}    
        for loacate in all_loactions_obj:
            data[loacate.location_id] = {

                "floor": loacate.floor,
                "others": loacate.others,
                "city":{ loacate.building.city.city_id :loacate.building.city.city },
                "building": {loacate.building.building_id : loacate.building.building},
                "department": { dept.dept_id: dept.department  for dept in loacate.department.all()},
                
            } 

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
        

@api_view(["POST"])
def get_user_info_by_empid(request):
    try:
        empid = request.data.get('empid')
        if not empid:
            return Response({'error': 'empid is required'}, status=400)
        
        try:
            user_obj = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'user does not exist'}, status=404)
        
        data = {
            
            'name': user_obj.name,
            'email': user_obj.email,
            'gender': user_obj.gender.gender,
            'profile_url': user_obj.profile_url,
            'department': { dept.dept_id: dept.department for dept in user_obj.department.all()},
            'designation': user_obj.designation.designation,
            'phone': user_obj.phone_number,
            'joining_date': user_obj.joining_date,
            'location': {
                'location_id': user_obj.location.location_id,
                'desk_number': user_obj.desk_number,
                'floor': user_obj.location.floor,
                'building': user_obj.location.building.building,
                'city': user_obj.location.building.city.city,
                'others': user_obj.location.others
            }
        }
        
        return Response(data, status=200)
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)



@api_view(["POST"])
def get_all_request_by_empid(request):
    try:
        empid = request.data.get('empid')
        if not empid:
            return Response({'error': 'empid is required'}, status=400)
        
        try:
            user_obj = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'user does not exist'}, status=404)
        
        all_request_obj = all_requests.objects.filter(request_by = user_obj).order_by("-create_on")
        
        data = {}
        
        for idx,request in enumerate(all_request_obj):
            current_status_obj = all_request_status_flow.objects.filter(request = request).order_by("-update_on").first()
            all_readers = request_view_status.objects.get(request=request)
            request_data ={
                "ticket_id": request.request_id,
                "requestor": {"empid": request.request_by.empid, "name":request.request_by.name},
                "time": request.create_on,
                "domain": {"name": request.domain.domain},
                "issue_catagory": {"name": request.sub_domain.sub_domain},
                "issue_sub_category": {"name" :request.service.service},
                "note":request.note,
                "status": {"name":current_status_obj.status.status, "color":current_status_obj.status.color },
                "read": True if (user_obj in all_readers.viewed_by.all()) else False,
            }
            data[idx] = request_data
            
        return Response(data, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def update_request_status(request):
    try:
        request_id = request.data.get('ticket_id')
        status_id = request.data.get('status_id')
        note = request.data.get('note')
        assign_to = request.data.get('assign_to')
        updated_by = request.data.get('updated_by')
        
        if not request_id:
            return Response({'error': 'request_id is required'}, status=400)
        if not status_id:
            return Response({'error': 'status_id is required'}, status=400)
        if not updated_by:
            return Response({'error': 'updated_by empid is required'}, status=400)
        
        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'request does not exist'}, status=404)
        
        try:
            status_obj = request_status.objects.get(status_id=status_id)
        except request_status.DoesNotExist:
            return Response({'error': 'status does not exist'}, status=404)
        
        assign_to_user_obj = None
        if assign_to:
            try:
                assign_to_user_obj = user_info.objects.get(empid=assign_to)
            except user_info.DoesNotExist:
                return Response({'error': 'assign_to empid does not exist'}, status=404)
        
        try:
            updated_by_user_obj = user_info.objects.get(empid=updated_by)
        except user_info.DoesNotExist:
            return Response({'error': 'updated_by empid does not exist'}, status=404)
        
        # Create the request status flow entry
        all_request_status_flow.objects.create(
            request=request_obj,
            status=status_obj,
            note=note,
            assign_to=assign_to_user_obj,
            updated_by=updated_by_user_obj
        )

        return Response({'message': 'status updated successfully'}, status=200)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)

    

    
@api_view(["POST"])
def request_status_flow_by_id(request):
    try:
        request_id = request.data.get('ticket_id')
        if not request_id:
            return Response({'error': 'ticket_id is required'}, status=400)
        
        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        request_flow_obj = all_request_status_flow.objects.filter(request=request_obj).order_by("update_on")
        
        data = {}
        
        for idx, request_status in enumerate(request_flow_obj):
            request_data = {
                "ticket_status_id": request_status.request_status_id,
                "status": {
                    "status_id": request_status.status.status_id,
                    "status": request_status.status.status,
                    "color": request_status.status.color
                },
                "note": request_status.note,
                "assign_to": {
                    "name": request_status.assign_to.name if request_status.assign_to else "",
                    "empid": request_status.assign_to.empid if request_status.assign_to else ""
                },
                "updated_by": {
                    "name": request_status.updated_by.name if request_status.updated_by else "",
                    "empid": request_status.updated_by.empid if request_status.updated_by else ""
                },
                "update_on": request_status.update_on,
            }
            data[idx] = request_data
            
        return Response(data, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
    


@api_view(["POST"])
def get_request_header_info(request):
    
    try:
        empid = request.data.get('empid')
        request_id = request.data.get('ticket_id')
        
        if not empid:
            return Response({'error': 'empid is required'}, status=400)
        
        if not request_id:
            return Response({'error': 'ticket_id is required'}, status=400)

        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        try:
            user_obj = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'user does not exist'}, status=404)
        
        current_status_obj = all_request_status_flow.objects.filter(request = request_obj).order_by("-update_on").first()
        all_readers = request_view_status.objects.get(request=request_obj)
        data = {
            
                "ticket_id": request_obj.request_id,
                "requestor": {"empid": request_obj.request_by.empid, "name":request_obj.request_by.name},
                "time": request_obj.create_on,
                "domain": {"name": request_obj.domain.domain, "id":request_obj.domain.domain_id},
                "issue_catagory": {"name": request_obj.sub_domain.sub_domain, "id": request_obj.sub_domain.sub_domain_id},
                "issue_sub_category": {"name" :request_obj.service.service, "id":request_obj.service.service_id},
                "note":request_obj.note,
                "current_status": {"name":current_status_obj.status.status, "color":current_status_obj.status.color},
                "read": True if (user_obj in all_readers.viewed_by.all()) else False,
        }
        

        return Response(data, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
    
    
@api_view(["POST"])
def get_request_by_acknowledge(request):
    
    try:
        empid = request.data.get('empid')
        
        if not empid:
            return Response({'error': 'empid is required'}, status=400)

        try:
            user = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)
    
    
        ack_request = all_requests.objects.filter(acknowledge = user, manager = user).order_by('-create_on')
    
        data = {}
        
        for idx, request in enumerate(ack_request):
            current_status_obj = all_request_status_flow.objects.filter(request = request).order_by("-update_on").first()
            all_readers = request_view_status.objects.get(request=request)
            request_data ={
                "ticket_id": request.request_id,
                "requestor": {"empid": request.request_by.empid, "name":request.request_by.name},
                "time": request.create_on,
                "domain": {"name": request.domain.domain},
                "issue_catagory": {"name": request.sub_domain.sub_domain},
                "issue_sub_category": {"name" :request.service.service},
                "note":request.note,
                "status": {"name":current_status_obj.status.status, "color":current_status_obj.status.color},
                "read": True if (user in all_readers.viewed_by.all()) else False,
            }
            data[idx] = request_data

        return Response(data, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    

@api_view(["POST"])
def get_unviewed_acknowledge_request_count(request):
    
    try:
        empid = request.data.get('empid')
        
        if not empid:
            return Response({'error': 'empid is required'}, status=400)

        try:
            user = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)
    
    
        ack_request = all_requests.objects.filter(Q(acknowledge=user) | Q(manager=user)).order_by('-create_on')
    
        unviewed_requests_count = request_view_status.objects.filter(
            request__in=ack_request
        ).exclude(viewed_by=user).count()
        


        return Response({'unviewed_requests_count': unviewed_requests_count}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
    



@api_view(["POST"])
def get_accessible_requests(request):

    try:
        empid = request.data.get('empid')
        if not empid:
            return Response({'error': 'empid is required'}, status=400)
        
        try:
            user = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)
        
        domain_min_access_levels = domain_minimum_access_level.objects.select_related('domain', 'access_level').all()
        accessible_subdomains = set()

        for domain_access in domain_min_access_levels:
            min_level = domain_access.access_level.level
            domain = domain_access.domain
            
            subdomains = sub_domains.objects.filter(domain=domain)
            
            for subdomain in subdomains:
                user_access = admin_access_priority.objects.filter(
                    user=user,
                    sub_domain=subdomain
                ).select_related('access_level').first()
                
                if user_access and user_access.access_level.level <= min_level:
                    accessible_subdomains.add(subdomain)

        admin_access_obj = admin_access.objects.filter(user=user)

        accessible_services = services.objects.filter(
            admin_access__in=admin_access_obj
        )

        accessible_departments = departments.objects.filter(
            admin_access__in=admin_access_obj
        )

        accessible_locations = locations.objects.filter(
            admin_access__in=admin_access_obj
        )

        accessible_domains = domains.objects.filter(
            admin_access__in=admin_access_obj
        )

        matching_requests = all_requests.objects.filter(
            sub_domain__in=accessible_subdomains,
            service__in=accessible_services,
            domain__in=accessible_domains,
            location__in=accessible_locations,
            requestor_department__in=accessible_departments
        ).distinct()
        
        assigned_requests = all_requests.objects.filter(
            requestor__assign_to=user 
        )

        final_requests = matching_requests.union(assigned_requests)

        data = {}
        
        for idx, request in enumerate(final_requests):
            current_status_obj = all_request_status_flow.objects.filter(request = request).order_by("-update_on").first()
            all_readers = request_view_status.objects.get(request=request)
            request_data ={
                "ticket_id": request.request_id,
                "requestor": {"empid": request.request_by.empid, "name":request.request_by.name},
                "time": request.create_on,
                "domain": {"name": request.domain.domain},
                "issue_catagory": {"name": request.sub_domain.sub_domain},
                "issue_sub_category": {"name" :request.service.service},
                "note":request.note,
                "status": {"name":current_status_obj.status.status, "color":current_status_obj.status.color},
                "read": True if (user in all_readers.viewed_by.all()) else False,
            }
            data[idx] = request_data
        
        
        # request_ids = matching_requests.values_list('request_id', flat=True)

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(["POST"])
def get_unviewed_accessible_requests_count(request):

    try:
        empid = request.data.get('empid')
        if not empid:
            return Response({'error': 'empid is required'}, status=400)
        
        try:
            user = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)
        
        domain_min_access_levels = domain_minimum_access_level.objects.select_related('domain', 'access_level').all()
        accessible_subdomains = set()

        for domain_access in domain_min_access_levels:
            min_level = domain_access.access_level.level
            domain = domain_access.domain
            
            subdomains = sub_domains.objects.filter(domain=domain)
            
            for subdomain in subdomains:
                user_access = admin_access_priority.objects.filter(
                    user=user,
                    sub_domain=subdomain
                ).select_related('access_level').first()
                
                if user_access and user_access.access_level.level <= min_level:
                    accessible_subdomains.add(subdomain)

        admin_access_obj = admin_access.objects.filter(user=user)

        accessible_services = services.objects.filter(
            admin_access__in=admin_access_obj
        )

        accessible_departments = departments.objects.filter(
            admin_access__in=admin_access_obj
        )

        accessible_locations = locations.objects.filter(
            admin_access__in=admin_access_obj
        )

        accessible_domains = domains.objects.filter(
            admin_access__in=admin_access_obj
        )

        matching_requests = all_requests.objects.filter(
            sub_domain__in=accessible_subdomains,
            service__in=accessible_services,
            domain__in=accessible_domains,
            location__in=accessible_locations,
            requestor_department__in=accessible_departments
        ).distinct()
        
        unviewed_requests_count = request_view_status.objects.filter(
            request__in=matching_requests
        ).exclude(viewed_by=user).count()
        
        

        return Response({'unviewed_requests_count': unviewed_requests_count}, status=200)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(["POST"])
def get_assign_to_user(request):

    try:
        sub_domain_id = request.data.get('sub_domain_id')
        
        if not sub_domain_id:
            return Response({'error': 'sub_domain_id is required'}, status=400)
        
        try:
            sub_domain = sub_domains.objects.get(sub_domain_id=sub_domain_id)
        except sub_domains.DoesNotExist:
            return Response({'error': 'Subdomain not found'}, status=404)

        admin_access_objects = admin_access.objects.filter(sub_domain=sub_domain)

        users_with_access = [access.user for access in admin_access_objects if access.user]
        
        user_data = [{"empid": user.empid, "name": user.name} for user in users_with_access]
        
        return Response(user_data, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    




@api_view(["POST"])
def get_request_access(request):
    
    try:
        empid = request.data.get('empid')
        request_id = request.data.get('ticket_id')
        
        if not empid:
            return Response({'error': 'empid is required'}, status=400)
        
        if not request_id:
            return Response({'error': 'ticket_id is required'}, status=400)

        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        try:
            user = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)
        
        
        isAdmin =  admin_access.objects.filter(user=user).exists()
        
        if isAdmin:
            domain_min_access_levels = domain_minimum_access_level.objects.select_related('domain', 'access_level').all()
            accessible_subdomains = set()

            for domain_access in domain_min_access_levels:
                min_level = domain_access.access_level.level
                domain = domain_access.domain
                
                subdomains = sub_domains.objects.filter(domain=domain)
                
                for subdomain in subdomains:
                    user_access = admin_access_priority.objects.filter(
                        user=user,
                        sub_domain=subdomain
                    ).select_related('access_level').first()
                    
                    if user_access and user_access.access_level.level <= min_level:
                        accessible_subdomains.add(subdomain)

            admin_access_obj = admin_access.objects.filter(user=user)

            accessible_services = services.objects.filter(
                admin_access__in=admin_access_obj
            )

            accessible_departments = departments.objects.filter(
                admin_access__in=admin_access_obj
            )

            accessible_locations = locations.objects.filter(
                admin_access__in=admin_access_obj
            )

            accessible_domains = domains.objects.filter(
                admin_access__in=admin_access_obj
            )

            matching_requests = all_requests.objects.filter(
                sub_domain__in=accessible_subdomains,
                service__in=accessible_services,
                domain__in=accessible_domains,
                location__in=accessible_locations,
                requestor_department__in=accessible_departments
            ).distinct()
            
            
            if request_obj in matching_requests:
                return Response({'access': True}, status=200)
            else:
                return Response({'access': False}, status=200)
        
        
        else:
            if (request_obj.request_by == user or user in request_obj.manager.all() or user in request_obj.acknowledge.all()):
                return Response({'access': True}, status=200)
            else:
                return Response({'access': False}, status=200)
                
            
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    

@api_view(["POST"])
def update_request_viewed_users(request):
    
    try:
        empid = request.data.get('empid')
        request_id = request.data.get('ticket_id')
        
        if not empid:
            return Response({'error': 'empid is required'}, status=400)
        
        if not request_id:
            return Response({'error': 'ticket_id is required'}, status=400)
        
        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        try:
            user = user_info.objects.get(empid=empid)
        except user_info.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)
        
        
        view_table = request_view_status.objects.get(request=request_obj)
        view_table.viewed_by.add(user)
        
        return Response({'message': 'User marked as viewed successfully'}, status=200)
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def get_viewer_by_request(request):
    
    try:
        request_id = request.data.get('ticket_id')
        
        if not request_id:
            return Response({'error': 'ticket_id is required'}, status=400)
        
        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        
        
        view_table = request_view_status.objects.get(request=request_obj)
        
        viewer = view_table.viewed_by.all()
        
        data = {}
        
        for view in viewer:
            data[view.empid] = {
                'name':view.name,
                'url': view.profile_url
            }
            
        
        
        return Response(data, status=200)
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
    
@api_view(["POST"])
def submit_rating(request):
    
    try:
        request_id = request.data.get('ticket_id')
        rating = request.data.get('rating', {})
        comment = request.data.get('comment', '')
        
        if not request_id:
            return Response({'error': 'ticket_id is required'}, status=400)
        
        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        
        request_obj.rating = rating
        request_obj.comment = comment
        
        request_obj.save()
    
        return Response({'message':'Rating received successfully'}, status=200)
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)



@api_view(["POST"])
def get_rating_by_ticketid(request):
    
    try:
        request_id = request.data.get('ticket_id')

        
        if not request_id:
            return Response({'error': 'ticket_id is required'}, status=400)
        
        try:
            request_obj = all_requests.objects.get(request_id=request_id)
        except all_requests.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        data = {
            "rating": request_obj.rating,
            "comment": request_obj.comment
        }
        
        return Response(data, status=200)
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(["POST"])
def get_user_for_domain(request):
    domain_ids = request.data.get('domain_ids')

    try:
        if domain_ids:
            domains_obj = domains.objects.filter(domain_id__in=domain_ids)
        else:
            domains_obj = domains.objects.all()
        
        data = {}

        for domain in domains_obj:
            data[domain.domain_id] = {'domain_name': domain.domain, 'users': {}}

            domain_user_objs = admin_access.objects.filter(domain=domain).select_related('user')

            for access_obj in domain_user_objs:
                user = access_obj.user 
                data[domain.domain_id]['users'][user.empid] = {
                    'name': user.name,
                }
        
        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(["POST"])
def get_subdomain_users_by_domain(request):
    domain_ids = request.data.get('domain_ids', [])

    try:
        if domain_ids:
            domains_obj = domains.objects.filter(domain_id__in=domain_ids)
        else:
            domains_obj = domains.objects.all()

        data = {}

        for domain in domains_obj:
            data[domain.domain_id] = {
                'domain_name': domain.domain,
                'subdomains': {}
            }

            subdomains = sub_domains.objects.filter(domain=domain)

            for subdomain in subdomains:
                data[domain.domain_id]['subdomains'][subdomain.sub_domain_id] = {
                    'subdomain_name': subdomain.sub_domain,
                    'users': []
                }
                
                user_accesses = admin_access_priority.objects.filter(sub_domain=subdomain)

                for user_access in user_accesses:
                    user = user_access.user
                    data[domain.domain_id]['subdomains'][subdomain.sub_domain_id]['users'].append({
                        'empid': user.empid,
                        'name': user.name,
                        'url': user.profile_url,
                    })

        return Response(data, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)



@api_view(["POST"])
def get_requests_summary(request):
    domain_ids = request.data.get('domain_ids', [])

    try:
        if domain_ids:
            domains_obj = domains.objects.filter(domain_id__in=domain_ids)
        else:
            domains_obj = domains.objects.all()

        data = {}
        for domain in domains_obj:
            domain_data = {}
            
            subdomain_objs = sub_domains.objects.filter(domain=domain)
            
            for subdomain in subdomain_objs:
                subdomain_data = {}
                
                service_objs = services.objects.filter(sub_domain=subdomain)
                
                for service in service_objs:
                    requests = all_requests.objects.filter(service=service)
                    
                    total_requests = requests.count()
                    closed_requests = requests.filter(status__status='closed').count()  
                    
                    subdomain_data[service.service] = {
                        'total_requests': total_requests,
                        'closed_requests': closed_requests
                    }
                
                domain_data[subdomain.sub_domain] = subdomain_data
            
            data[domain.domain] = domain_data  
        
        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def edit_buiding_name(request):
    try:
        building_id = request.data.get('building_id')
        new_name = request.data.get('new_name')
        
        if not building_id:
            return Response({'error': 'building_id is required'}, status=400)
        if not new_name:
            return Response({'error': 'new_name is required'}, status=400)
        
        try:
            building_obj = buildings.objects.get(building_id=building_id)
        except buildings.DoesNotExist:
            return Response({'error': 'Ticket does not exist'}, status=404)
        
        
        building_obj.building = new_name
        building_obj.save()
        
        return Response({'message': 'Building renamed successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(["POST"])
def edit_city(request):
    try:
        city_id = request.data.get('city_id')
        new_name = request.data.get('new_name')
        
        if not city_id:
            return Response({'error': 'city_id is required'}, status=400)
        if not new_name:
            return Response({'error': 'new_name is required'}, status=400)
        
        try:
            city_obj = cities.objects.get(city_id=city_id)
        except cities.DoesNotExist:
            return Response({'error': 'City does not exist'}, status=404)
        
        
        city_obj.city = new_name
        city_obj.save()
        
        return Response({'message': 'City renamed successfully'}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(["POST"])
def create_city(request):
    try:
        city_name = request.data.get('city_name')
        
        if not city_name:
            return Response({'error': 'city_name is required'}, status=400)
        
        
        cities.objects.create(
            city = city_name
        )
        
        return Response({'message': 'City added successfully'}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def edit_location(request):
    try:
        location_id = request.data.get('location_id')
        new_name = request.data.get('new_floor')
        new_others = request.data.get('new_others')
        
        if not location_id:
            return Response({'error': 'location_id is required'}, status=400)
        if not new_name:
            return Response({'error': 'new_name is required'}, status=400)
        if not new_others:
            return Response({'error': 'new_others is required'}, status=400)
        
        try:
            location_obj = locations.objects.get(location_id=location_id)
        except locations.DoesNotExist:
            return Response({'error': 'Location does not exist'}, status=404)
        
        
        location_obj.floor = new_name,
        location_obj.others = new_others
        location_obj.save()
        
        return Response({'message': 'Location changed successfully'}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def create_location(request):
    try:
        building_id = request.data.get('building_id')
        floor = request.data.get('floor')
        others = request.data.get('others', '')
        department_ids = request.data.get('departments')  
        
        if not building_id:
            return Response({'error': 'building_id is required'}, status=400)
        if not floor:
            return Response({'error': 'floor is required'}, status=400)

        try:
            building_obj = buildings.objects.get(building_id=building_id)
        except buildings.DoesNotExist:
            return Response({'error': 'Building does not exist'}, status=404)
        
        new_location = locations.objects.create(
            building=building_obj,
            floor=floor,
            others=others
        )
        
        if department_ids:
            dept_obj = departments.objects.filter(dept_id__in=department_ids)
            new_location.department.set(dept_obj)
        
        return Response({'message': 'Location added successfully'}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)



################################################! Administrator Section ################################################

@api_view(["POST"])
def create_new_domain(request):
    try:
        domain_name = request.data.get('domain_name', '').strip()
        empid_list = request.data.get('empid_list', [])

        if not domain_name:
            return Response({'error': 'Domain name is required'}, status=400)
        
        if not empid_list:
            return Response({'error': 'Employee list is required'}, status=400)

        emp_list_obj = user_info.objects.filter(empid__in=empid_list)
        found_empids = set(emp.empid for emp in emp_list_obj)
        missing_empids = set(empid_list) - found_empids

        if missing_empids:
            return Response({'error': f'Members {list(missing_empids)} not found.'}, status=404)

        new_domain_obj = domains.objects.create(domain=domain_name)

        for emp in emp_list_obj:
            admin_access_table, created = admin_access.objects.get_or_create(user=emp)
            admin_access_table.domain.add(new_domain_obj)  

        return Response({'message': 'Domain created successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def add_domain_user(request):
    try:
        domain_id = request.data.get('domain_id','')
        empid_list = request.data.get('empid_list', [])

        if not domain_id:
            return Response({'error': 'Domain id is required'}, status=400)
        
        if not empid_list:
            return Response({'error': 'Employee list is required'}, status=400)
        
        try:
            domain_obj = domains.objects.get(domain_id=domain_id)
        except domains.DoesNotExist:
            return Response({'error': 'Domain does not exist'}, status=404)

        emp_list_obj = user_info.objects.filter(empid__in=empid_list)
        found_empids = set(emp.empid for emp in emp_list_obj)
        missing_empids = set(empid_list) - found_empids

        if missing_empids:
            return Response({'error': f'Members {list(missing_empids)} not found.'}, status=404)

        for emp in emp_list_obj:
            admin_access_table, created = admin_access.objects.get_or_create(user=emp)
            admin_access_table.domain.add(domain_obj)  

        return Response({'message': 'Members added to Domain successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def create_new_sub_domain(request):
    try:
        domain_id = request.data.get('domain_id', '')
        sub_domain_name = request.data.get('sub_domain_name', '').strip()
        empid_list = request.data.get('empid_list', [])

        if not domain_id:
            return Response({'error': 'Domain id is required'}, status=400)
        
        if not sub_domain_name:
            return Response({'error': 'Sub Domain name is required'}, status=400)
        
        if not empid_list:
            return Response({'error': 'Employee list is required'}, status=400)
        
        try:
            domain_obj = domains.objects.get(domain_id=domain_id)
        except domains.DoesNotExist:
            return Response({'error': 'Domain does not exist'}, status=404)

        emp_list_obj = user_info.objects.filter(empid__in=empid_list)
        found_empids = set(emp.empid for emp in emp_list_obj)
        missing_empids = set(empid_list) - found_empids

        if missing_empids:
            return Response({'error': f'Members {list(missing_empids)} not found.'}, status=404)

        new_sub_domain_obj = sub_domains.objects.create(
            domain=domain_obj,
            sub_domain = sub_domain_name
            )

        for emp in emp_list_obj:
            admin_access_table, created = admin_access.objects.get_or_create(user=emp)
            admin_access_table.sub_domain.add(new_sub_domain_obj)  

        return Response({'message': 'Sub Domain created successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
    
@api_view(["POST"])
def add_sub_domain_user(request):
    try:
        sub_domain_id = request.data.get('sub_domain_id','')
        empid_list = request.data.get('empid_list', [])

        if not sub_domain_id:
            return Response({'error': 'Sub Domain id is required'}, status=400)
        
        if not empid_list:
            return Response({'error': 'Employee list is required'}, status=400)
        
        try:
            sub_domain_obj = sub_domains.objects.get(sub_domain_id=sub_domain_id)
        except sub_domains.DoesNotExist:
            return Response({'error': 'Domain does not exist'}, status=404)

        emp_list_obj = user_info.objects.filter(empid__in=empid_list)
        found_empids = set(emp.empid for emp in emp_list_obj)
        missing_empids = set(empid_list) - found_empids

        if missing_empids:
            return Response({'error': f'Members {list(missing_empids)} not found.'}, status=404)

        for emp in emp_list_obj:
            admin_access_table, created = admin_access.objects.get_or_create(user=emp)
            admin_access_table.sub_domain.add(sub_domain_obj)  

        return Response({'message': 'Members added to Sub Domain successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    
@api_view(["POST"])
def create_new_service(request):
    try:
        sub_domain_id = request.data.get('sub_domain_id', '')
        service_name = request.data.get('service_name', '').strip()
        empid_list = request.data.get('empid_list', [])

        
        if not sub_domain_id:
            return Response({'error': 'Sub Domain id is required'}, status=400)
        
        if not service_name:
            return Response({'error': 'Service name is required'}, status=400)
        
        
        try:
            sub_domain_obj = sub_domains.objects.get(sub_domain_id=sub_domain_id)
        except sub_domains.DoesNotExist:
            return Response({'error': 'Sub Domain does not exist'}, status=404)


        new_service_obj = services.objects.create(
            sub_domain = sub_domain_obj,
            service = service_name,
            )
        
        if empid_list:
            emp_list_obj = user_info.objects.filter(empid__in=empid_list)
            found_empids = set(emp.empid for emp in emp_list_obj)
            missing_empids = set(empid_list) - found_empids

            if missing_empids:
                return Response({'error': f'Members {list(missing_empids)} not found.'}, status=404)

            for emp in emp_list_obj:
                admin_access_table, created = admin_access.objects.get_or_create(user=emp)
                admin_access_table.service.add(new_service_obj)  

        return Response({'message': 'Service created successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    

@api_view(["POST"])
def rename_service_name(request):
    try:
        service_id = request.data.get('service_id', '')
        new_service_name = request.data.get('new_service_name', '').strip()


        
        if not service_id:
            return Response({'error': 'Service id is required'}, status=400)
        
        if not new_service_name:
            return Response({'error': 'New Serviceservice_id name is required'}, status=400)
        
        
        try:
            service_obj = services.objects.get(service_id=service_id)
        except services.DoesNotExist:
            return Response({'error': 'Services does not exist'}, status=404)   
        
             
        service_obj.service = new_service_name
        service_obj.save()
        
        return Response({'message': 'Service name updated successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
        


@api_view(["POST"])
def get_hierarchy_by_domain(request):
    try:
        domain_id = request.data.get('domain_id', '')

        
        if not domain_id:
            return Response({'error': 'Sub Domain id is required'}, status=400)
        
        try:
            domain_obj = domains.objects.get(domain_id=domain_id)
        except domains.DoesNotExist:
            return Response({'error': 'Domain does not exist'}, status=404)
        
        
        subdomains = sub_domains.objects.filter(domain=domain_obj)

        result = {}
        for subdomain in subdomains:
            access_priorities = admin_access_priority.objects.filter(sub_domain=subdomain)

            subdomain_data = {}
            for access in access_priorities:
                users = user_info.objects.filter(admin_access_priority__access_level=access.access_level,
                                                admin_access_priority__sub_domain=subdomain).distinct()
                
                # Prepare user data
                user_list = [{"empid": user.empid, "name": user.name, "email": user.email} for user in users]
                
                subdomain_data[str(access.access_level.level)] = user_list
            
            result[subdomain.sub_domain_id] = {'name':subdomain.sub_domain, 'hierarchy':subdomain_data}


        return Response(result, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    


@csrf_exempt
@api_view(["POST"])
def get_user_access_by_subdomain(request):
    try:
        subdomain_ids = request.GET.getlist('subdomain_ids') 

        if not subdomain_ids:
            subdomains = sub_domains.objects.all()
        else:
            subdomains = sub_domains.objects.filter(sub_domain_id__in=subdomain_ids)
        
        result = {}

        for subdomain_obj in subdomains:
            subdomain_key = subdomain_obj.sub_domain
            locations_with_access = {}

            all_locations = locations.objects.all()

            for loc in all_locations:
                users_with_access = user_info.objects.filter(
                    admin_access__sub_domain=subdomain_obj,
                    location=loc
                ).distinct()
                
                location_info = {"floor": loc.floor,
                                 "others": loc.others,
                                 "building": loc.building.building,
                                 "city": loc.building.city.city,
                                 "departments":  {dept.dept_id:dept.department for dept in loc.department.all()}}

                if users_with_access.exists():
                    user_data = {user.empid: {
                        "name": user.name,
                        "empid": user.empid,
                        "url": user.profile_url
                    } for user in users_with_access}

                    locations_with_access[loc.location_id] ={"location": location_info, "users": user_data} 
                else:
                    locations_with_access[loc.location_id] = {"location": location_info, "users": {}} 

            result[subdomain_key] = locations_with_access

        return Response(result, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


    

###################################### Log in Authentication ######################################
@api_view(['POST'])
def check_user_email(request):
    email = request.data.get('email', None)

    # email = 'hasan.sad@ulkasemi.com'
    print(email)

    if not email:
        return Response({'error': 'Email is required.'}, status=404)
    
    if not email.endswith('@ulkasemi.com'):
        return Response({'error': 'Unauthorized mail address.'}, status=401)

    user_exists = user_info.objects.filter(email=email).exists()

    if user_exists:
        return Response({'result': True, 'empid':user_info.objects.filter(email=email).first().empid}, status=200)
    else:
        return Response({'result': False}, status=200)
    


@api_view(['POST'])
def get_user_info_by_email(request):
    # Get the email from the request data
    email = request.data.get('email')
    

    if not email:
        return Response({'error': 'Email parameter is required.'}, status=400)

    user = user_info.objects.filter(email=email).first()

    if not user:
        return Response({'error': 'User not found.'}, status=404)

    user_data = {
        'empid': user.empid,
        'name': user.name,
        'email': user.email,
        'picture': user.profile_url,
        'department': [dept.department for dept in user.department.all()],
        'designation': user.designation.designation if user.designation else None,
    }

    return Response(user_data, status=200)


@api_view(['POST'])
def update_profile_url(request):
    email = request.data.get('email')
    new_profile_url = request.data.get('profile_url')

    if not email or not new_profile_url:
        return Response(
            {"error": "Email and profile URL are required."}, 
            status=400
        )

    try:
        user = user_info.objects.get(email=email)

        if user.profile_url != new_profile_url:
            user.profile_url = new_profile_url
            user.save()

            return Response(
                {"message": "Profile URL updated successfully."}, 
                status=200
            )
        else:
            return Response(
                {"message": "No update needed. Profile URL is the same."}, 
                status=200
            )

    except user_info.DoesNotExist:
        return Response(
            {"error": "User with provided email does not exist."}, 
            status=404
        )
        
        

@api_view(["POST"])
def create_buiding(request):
    try:
        city_id = request.data.get('city_id')
        building_name = request.data.get('building_name')
        
        if not city_id:
            return Response({'error': 'city_id is required'}, status=400)
        if not building_name:
            return Response({'error': 'building_name is required'}, status=400)
        
        try:
            city_obj = cities.objects.get(city_id=city_id)
        except cities.DoesNotExist:
            return Response({'error': 'City does not exist'}, status=404)
        
        
        buildings.objects.create(
            city = city_obj,
            building = building_name
        )
        
        return Response({'message': 'Building created successfully'}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)