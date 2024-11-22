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
        managers = request.data.get('managers', [])
        acknowledge = request.data.get('acknowledge', [])
        domain = request.data.get('domain')
        service = request.data.get('service')
        urgency_id = request.data.get('urgency')
        note = request.data.get('note')
        
        if not request_by:
            return Response({'error':'request_by empid required'}, status=400)
        if not managers:
            return Response({'error':'managers empid required'}, status=400)
        if not acknowledge:
            return Response({'error':'acknowledge empid required'}, status=400)
        if not domain:
            return Response({'error':'domain is required'}, status=400)
        if not service:
            return Response({'error':'service is required'}, status=400)
        if not urgency_id:
            return Response({'error':'urgency is required'}, status=400)
        
        try:
            request_by_obj = user_info.objects.get(empid = request_by)
        except user_info.DoesNotExist:
            return Response({'error':'user does not found'})
        
        managers_obj = user_info.objects.filter(empid__in = managers)
        acknowledge_obj = user_info.objects.filter(empid__in = acknowledge)
        
        try:
            domain_obj = domains.objects.get(domain_id = domain)
        except domains.DoesNotExist:
            return Response({'error':'domain does not found'})
        
        try:
            service_obj = sub_domains.objects.get(sub_domain_id = service)
        except sub_domains.DoesNotExist:
            return Response({'error':'service does not found'})
        
        try:
            urgency_obj = urgency.objects.get(urgency_id = urgency_id)
        except urgency.DoesNotExist:
            return Response({'error':'urgency does not found'})
        
        
        new_request = all_requests.objects.create(
            
            request_by = request_by_obj,
            domain = domain_obj,
            sub_domain = service_obj,
            urgency = urgency_obj,
            note = note
        )
        
        new_request.manager.set(managers_obj)
        new_request.acknowledge.set(acknowledge_obj)
        
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
def get_all_urgency(request):
    try:
        all_urgency_obj = urgency.objects.all()
        
        data = {var.urgency_id : var.urgency for var in all_urgency_obj}

        return Response(data, status=200)
    
    except Exception as e:
        return Response({'error':str(e)}, status=500)
    
@api_view(["POST"])
def get_all_service(request):
    domain = request.data.get('domain')
    
    if domain: 
        try:
            try:
                domain_obj = domains.objects.get(domain_id = domain)
            except domains.DoesNotExist:
                return Response({'error':'domain not exist'}, status=401)
            
            all_service_obj = sub_domains.objects.filter(domain = domain_obj)
            
            data = {var.sub_domain_id : var.sub_domain for var in all_service_obj}

            return Response(data, status=200)
        
        except Exception as e:
            return Response({'error':str(e)}, status=500)
        
    else:
        try:
            all_service_obj = sub_domains.objects.all()
            
            data = {var.sub_domain_id : var.sub_domain for var in all_service_obj}

            return Response(data, status=200)
        
        except Exception as e:
            return Response({'error':str(e)}, status=500)