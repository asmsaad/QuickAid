# Generated by Django 4.2.6 on 2024-11-18 06:39

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='genders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender_id', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('gender', models.CharField(default='', max_length=30, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='user_info',
            name='joining_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='user_info',
            name='phone_number',
            field=models.CharField(default='', max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='user_roles',
            name='role_id',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user_info',
            name='department',
            field=models.ManyToManyField(blank=True, to='Backend.departments'),
        ),
        migrations.AlterField(
            model_name='user_info',
            name='designation',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Backend.designation'),
        ),
        migrations.AlterField(
            model_name='user_info',
            name='role',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Backend.user_roles'),
        ),
        migrations.AddField(
            model_name='user_info',
            name='gender',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Backend.genders'),
        ),
    ]