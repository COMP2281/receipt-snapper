# Generated by Django 5.1.3 on 2025-03-13 20:44

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("expenses", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="expense",
            name="image_url",
            field=models.URLField(blank=True, null=True),
        ),
    ]
