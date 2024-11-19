import os, sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend_Server.settings')
django.setup()

from Backend.models import designation

# List of designations
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

# Populate the database
for des in designations:
    designation.objects.get_or_create(designation=des)
print("Designations added successfully!")
