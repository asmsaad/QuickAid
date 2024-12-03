from django.db import models
import time, hashlib
from django.utils import timezone


def generate_hashed_unique_id():
    # Get the current time in seconds
    timestamp = str(int(time.time()))
    hash_object = hashlib.sha256(timestamp.encode())
    hashed_id = int(hash_object.hexdigest(), 16) % (10**8)  # Take last 8 digits
    return str(hashed_id)

def generate_random_user_id():
    # Get the current time in seconds
    timestamp = str(int(time.time()))
    hash_object = hashlib.sha256(timestamp.encode())
    hashed_id = int(hash_object.hexdigest(), 16) % (10**6)  # Take last 6 digits
    return str(hashed_id)


class request_status(models.Model):
    status_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    color = models.CharField(max_length = 30, default = 'red', null = True, )
    status = models.CharField(max_length = 30, default = '', null = True)
    def __str__(self):
        return f'{self.status}'
    
    def save(self, *args, **kwargs):
        if not self.status_id and not self.pk: 
            self.status_id = generate_hashed_unique_id()
        super().save(*args, **kwargs) 
 
    
class priority(models.Model):
    priority_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    priority = models.CharField(max_length = 30, default = '', null = True)
    def __str__(self):
        return f'{self.priority}'
    
    def save(self, *args, **kwargs):
        if not self.priority_id and not self.pk: 
            self.priority_id = generate_hashed_unique_id()
        super().save(*args, **kwargs) 
 
    
class departments(models.Model):
    dept_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    department = models.CharField(max_length = 50, default = '', null = True)
    def __str__(self):
        return f'{self.department}'
    
    def save(self, *args, **kwargs):
        if not self.dept_id and not self.pk: 
            self.dept_id = generate_hashed_unique_id()
        super().save(*args, **kwargs) 
        
         
class designation(models.Model):
    des_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    designation = models.CharField(max_length = 50, default = '', null = True)
    def __str__(self):
        return f'{self.designation}'
    
    def save(self, *args, **kwargs):
        if not self.des_id and not self.pk: 
            self.des_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  


class user_roles(models.Model):
    role_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    role = models.CharField(max_length = 30, default = '', null = True)
    def __str__(self):
        return f'{self.role}'

    def save(self, *args, **kwargs):
        if not self.role_id and not self.pk: 
            self.role_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  
        
class genders(models.Model):
    gender_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    gender = models.CharField(max_length = 30, default = '', null = True)
    def __str__(self):
        return f'{self.gender}'

    def save(self, *args, **kwargs):
        if not self.gender_id and not self.pk: 
            self.gender_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  
        

class cities(models.Model):
    city_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    city = models.CharField(max_length = 150, default = '', null = True , blank=True) 
    
    def __str__(self):
        return f'{self.city}'

    def save(self, *args, **kwargs):
        if not self.city_id and not self.pk: 
            self.city_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  

class buildings(models.Model): 
    building_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    city = models.ForeignKey(cities, on_delete=models.CASCADE, null=True, blank=True)
    building = models.CharField(max_length = 150, default = '', null = True , blank=True) 
    
    def __str__(self):
        return f'{self.building}'

    def save(self, *args, **kwargs):
        if not self.building_id and not self.pk: 
            self.building_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  
        
class locations(models.Model):
    location_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    building = models.ForeignKey(buildings, on_delete=models.CASCADE, null=True, blank=True)
    floor = models.CharField(max_length = 150, default = '', null = True , blank=True)
    others = models.CharField(max_length = 300, default = '', null = True , blank=True)
    department = models.ManyToManyField(departments, blank=True)
    def __str__(self):
        return f'{self.building}_{self.floor}{f"_{self.others}" if self.others is not None else ""}'

    def save(self, *args, **kwargs):
        if not self.location_id and not self.pk: 
            self.location_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  
        
        
class domains(models.Model):
    domain_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    domain = models.CharField(max_length = 100, default = '', null = True)
    def __str__(self):
        return f'{self.domain}'

    def save(self, *args, **kwargs):
        if not self.domain_id and not self.pk: 
            self.domain_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  
        
class sub_domains(models.Model):
    sub_domain_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    domain = models.ForeignKey(domains, on_delete=models.CASCADE, null=True, blank=True)
    sub_domain = models.CharField(max_length = 100, default = '', null = True)
    def __str__(self):
        return f'{self.domain} > {self.sub_domain}'

    def save(self, *args, **kwargs):
        if not self.sub_domain_id and not self.pk: 
            self.sub_domain_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  
        
class services(models.Model):
    service_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    sub_domain = models.ForeignKey(sub_domains, on_delete=models.CASCADE, null=True, blank=True)
    service = models.CharField(max_length = 100, default = '', null = True)
    def __str__(self):
        return f'{self.sub_domain} > {self.service}'

    def save(self, *args, **kwargs):
        if not self.service_id and not self.pk: 
            self.service_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)  
        
class urgency(models.Model):
    urgency_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    color = models.CharField(max_length = 100, default = 'red', null = True, )
    urgency = models.CharField(max_length = 100, default = '', null = True)
    def __str__(self):
        return f'{self.urgency}'
    
    def save(self, *args, **kwargs):
        if not self.urgency_id and not self.pk: 
            self.urgency_id = generate_hashed_unique_id()
        super().save(*args, **kwargs) 
 
    
class user_info(models.Model):
    empid = models.CharField(max_length = 20, default = '', null = True)
    name = models.CharField(max_length = 100, default = '', null = True)
    email = models.CharField(max_length = 100, default = '', null = True)
    gender = models.ForeignKey(genders, on_delete=models.CASCADE, null=True, blank=True)
    profile_url = models.CharField(max_length = 1000, default = '', null = True, blank=True)
    role = models.ForeignKey(user_roles, on_delete=models.CASCADE, null=True, blank=True)
    department = models.ManyToManyField(departments , blank=True)
    designation = models.ForeignKey(designation, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length = 20, default = '', null = True)
    joining_date = models.DateField(default=timezone.now)
    location = models.ForeignKey(locations, on_delete=models.CASCADE, null=True, blank=True)
    desk_number = models.CharField(max_length = 20, default = '', null = True)
    total_request_count = models.IntegerField(default=0)
    create_on = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f'{self.name} ({self.empid})'
    
    
class employee_supervisors(models.Model):
    employee = models.OneToOneField(user_info, on_delete=models.CASCADE, related_name='sup')
    supervisors = models.ManyToManyField(user_info, blank=True) 
    
    def __str__(self):
        return f"{self.employee}'s supervisors"
    
    
class access_level(models.Model):
    level = models.IntegerField() 
    def __str__(self):
        return f'{self.level}'  
    
class domain_minimum_access_level(models.Model):
    dmaid = models.CharField(max_length = 100, default = '', null = True, blank=True)
    domain = models.ForeignKey(domains, on_delete=models.CASCADE, null=True, blank=True)
    access_level = models.ForeignKey(access_level, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return f'{self.domain}_minimum level : {self.access_level}'
    
    def save(self, *args, **kwargs):
        if not self.dmaid and not self.pk: 
            self.dmaid = generate_hashed_unique_id()
        super().save(*args, **kwargs)   
        
class admin_access_priority(models.Model):
    apid = models.CharField(max_length = 100, default = '', null = True, blank=True)
    user = models.ForeignKey(user_info, on_delete=models.CASCADE, null=True, blank=True)
    sub_domain = models.ForeignKey(sub_domains, on_delete=models.CASCADE, null=True, blank=True)
    access_level = models.ForeignKey(access_level, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return f'{self.sub_domain}_{self.user}_Level : {self.access_level}'
    
    def save(self, *args, **kwargs):
        if not self.apid and not self.pk: 
            self.apid = generate_hashed_unique_id()
        super().save(*args, **kwargs)   
    
class admin_access(models.Model):
    access_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    user = models.ForeignKey(user_info, on_delete=models.CASCADE, null=True, blank=True)
    domain = models.ManyToManyField(domains, blank=True)
    sub_domain = models.ManyToManyField(sub_domains, blank=True)
    service = models.ManyToManyField(services, blank=True)
    department = models.ManyToManyField(departments, blank=True)
    location = models.ManyToManyField(locations, blank=True)
    
    def __str__(self):
        return f'{self.user}'
    
    def save(self, *args, **kwargs):
        if not self.access_id and not self.pk: 
            self.access_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)   
    
    
#! Need to implement counter on future. Else create a big error.......  
class all_requests(models.Model):
    request_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    request_by = models.ForeignKey(user_info, on_delete=models.CASCADE, null=True, blank=True,related_name='requests_by_user')
    manager = models.ManyToManyField(user_info, blank=True, related_name='managing_requests')
    acknowledge = models.ManyToManyField(user_info, blank=True, related_name='acknowledged_requests')
    requestor_department = models.ManyToManyField(departments, blank=True)
    domain = models.ForeignKey(domains, on_delete=models.CASCADE, null=True, blank=True)
    sub_domain = models.ForeignKey(sub_domains, on_delete=models.CASCADE, null=True, blank=True)
    service = models.ForeignKey(services, on_delete=models.CASCADE, null=True, blank=True)
    urgency = models.ForeignKey(urgency, on_delete=models.CASCADE, null=True, blank=True)
    location = models.ForeignKey(locations, on_delete=models.CASCADE, null=True, blank=True)
    desk_number = models.CharField(max_length = 100, default = '', null = True, blank=True)
    note = models.TextField(blank=True, null=True)
    status = models.ForeignKey(request_status, on_delete=models.CASCADE, null=True, blank=True)
    create_on = models.DateTimeField(default=timezone.now)
    rating = models.JSONField(default=dict,blank=True)
    comment = models.TextField(default='',blank=True)

    def __str__(self):
        return f'{self.request_by}_{self.request_id}'
    
    def save(self, *args, **kwargs):
        if not self.request_id and not self.pk:
            if not self.request_by:
                raise ValueError("The 'request_by' field must be set to generate the request_id.")
            
            empid = self.request_by.empid
            total_request = self.request_by.total_request_count
            new_request_count = total_request + 1
            self.request_id = f"{empid}-{new_request_count:02d}"  
        super().save(*args, **kwargs)
        
        
class all_request_status_flow(models.Model):
    request_status_id = models.CharField(max_length = 100, default = '', null = True, blank=True)
    request = models.ForeignKey(all_requests, on_delete=models.CASCADE, null=True, blank=True,related_name='requestor')
    status = models.ForeignKey(request_status, on_delete=models.CASCADE, null=True, blank=True,related_name='requests_by_user')
    note = models.TextField(blank=True, null=True)
    assign_to = models.ForeignKey(user_info, on_delete=models.CASCADE, null=True, blank=True,related_name='assign_to')
    updated_by = models.ForeignKey(user_info, on_delete=models.CASCADE, null=True, blank=True,related_name='updated_by')
    update_on = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f'{self.request}_{self.status}'
    
    def save(self, *args, **kwargs):
        if not self.request_status_id and not self.pk: 
            self.request_status_id = generate_hashed_unique_id()
        super().save(*args, **kwargs)   
        
        
        

class request_view_status(models.Model):
    request = models.OneToOneField(all_requests, on_delete=models.CASCADE, null=True, blank=True)
    viewed_by = models.ManyToManyField(user_info, blank=True)
    
    def __str__(self):
        return f'{self.request}'
    
    

class notification_token(models.Model):
    user = models.OneToOneField(user_info, on_delete=models.CASCADE)
    token =  models.CharField(max_length = 10000, default = '', null = True, blank=True)
    
    def __str__(self):
        return f'{self.user}'
    
    
