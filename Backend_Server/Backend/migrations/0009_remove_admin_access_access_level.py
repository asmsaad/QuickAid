# Generated by Django 4.2.6 on 2024-11-20 06:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Backend', '0008_admin_access'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='admin_access',
            name='access_level',
        ),
    ]