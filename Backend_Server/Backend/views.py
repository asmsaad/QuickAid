from django.shortcuts import render
from django.http import HttpResponse
from .models import *

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from rest_framework import status
from .models import designation
from django.db import IntegrityError


def home(request):
    return HttpResponse("Yoooooooooo I am working Fine!")

class PopulateDesignationsView(APIView):
    def post(self, request, *args, **kwargs):
        # List of designations to add
        designations = [
            'Assistant Engineer', 'Assistant Engineering Program Manager',
            'Assistant Engineering Program Manager (AEPM)', 'Assistant Manager',
            'Assistant Manager-Finance & Accounts', 'Assistant Program Manager',
            'Assistant Technical Manager', 'Director', 'Engineer',
            'Executive-Branding & PR', 'Junior Executive-Facility Management',
            'Junior Executive-Maintenance', 'Junior Executive-Procurement & Inventory',
            'Manager-Branding & PR', 'Manager-Finance & Accounts',
            'Member Of Business Team-I, HR', 'Member of Technical Staff (MTS)',
            'Procurement & Administration Officer', 'Program Manager',
            'Senior Director', 'Senior Director-IC Design, EDA & IT',
            'Senior Engineer', 'Senior Executive', 'Senior Executive-HR',
            'Senior Executive-HR & QMS', 'Senior IT Specialist', 'Senior Manager-HR',
            'Senior Officer-Facility Management', 'Senior Program Manager & Critical Services',
            'Senior Technical Manager', 'Store Coordinator-Facility Management',
            'Technical Manager', 'Trainee Engineer', 'VP', 'Well-being Counselor'
        ]

        # Add designations to the database
        added_designations = []
        for des in designations:
            obj, created = designation.objects.get_or_create(designation=des)
            if created:
                added_designations.append(des)

        return Response(
            {"message": "Designations added successfully!", "added": added_designations},
            status=200,
        )
 
        
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from .models import user_info, genders

class PopulateUserInfoView(APIView):
    def post(self, request, *args, **kwargs):
        user_data_list = request.data.get('data', [])
        
        # Iterate over each user's data
        for user_data in user_data_list:
            try:
                # Try to get the existing user by empid
                user_info_obj, created = user_info.objects.get_or_create(empid=user_data['empid'])

                # Only update the user if it was newly created
                if created:
                    gender = self.get_gender(user_data['gender'])  # Get gender instance safely

                    # Update user info with provided data
                    user_info_obj.name = user_data['name']
                    user_info_obj.email = user_data['email']
                    user_info_obj.gender = gender
                    user_info_obj.phone_number = user_data.get('phone', '')

                    user_info_obj.joining_date = user_data['doj']

                    user_info_obj.create_on = timezone.now()
                    user_info_obj.save()

            except Exception as e:
                # You can log the error here instead of returning immediately.
                # logging.exception(f"Error processing empid {user_data['empid']}: {str(e)}")
                return Response({'error': str(e)}, status=400)

        return Response({'Success': 'Succeeded'}, status=200)

    def get_gender(self, gender_name):
        """Retrieve or create gender if not found."""
        try:
            gender = genders.objects.get(gender=gender_name)
        except genders.DoesNotExist:
            # Handle the case where gender doesn't exist, possibly create it or return a default
            gender = None  # Or handle it as needed, e.g., create a default gender
        return gender





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
                    "name": request_status.assign_to.name if request_status.assign_to else ""
                },
                "updated_by": {
                    "name": request_status.updated_by.name if request_status.updated_by else ""
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
    
    
        ack_request = all_requests.objects.filter(acknowledge = user).order_by('-create_on')
    
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
        
        data = {}
        
        for idx, request in enumerate(matching_requests):
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
def create_new_service(request):
    try:
        domain_id = request.data.get('domain_id', '')
        sub_domain_id = request.data.get('sub_domain_id', '')
        service_name = request.data.get('service_name', '').strip()
        empid_list = request.data.get('empid_list', [])

        if not domain_id:
            return Response({'error': 'Domain id is required'}, status=400)
        
        if not sub_domain_id:
            return Response({'error': 'Sub Domain id is required'}, status=400)
        
        if not service_name:
            return Response({'error': 'Service name is required'}, status=400)
        
        if not empid_list:
            return Response({'error': 'Employee list is required'}, status=400)
        
        try:
            domain_obj = domains.objects.get(domain_id=domain_id)
        except domains.DoesNotExist:
            return Response({'error': 'Domain does not exist'}, status=404)
        
        try:
            sub_domain_obj = sub_domains.objects.get(domain_id=domain_id)
        except sub_domains.DoesNotExist:
            return Response({'error': 'Sub Domain does not exist'}, status=404)

        emp_list_obj = user_info.objects.filter(empid__in=empid_list)
        found_empids = set(emp.empid for emp in emp_list_obj)
        missing_empids = set(empid_list) - found_empids

        if missing_empids:
            return Response({'error': f'Members {list(missing_empids)} not found.'}, status=404)

        new_service_obj = services.objects.create(
            domain=domain_obj,
            sub_domain = sub_domain_obj,
            service = service_name,
            )

        for emp in emp_list_obj:
            admin_access_table, created = admin_access.objects.get_or_create(user=emp)
            admin_access_table.service.add(new_service_obj)  

        return Response({'message': 'Service created successfully'}, status=201)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
    

    
    
