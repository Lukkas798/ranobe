from django.db import models

class Article(models.Model):
    objects = None
    title = models.CharField(max_length=200)
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    tag = models.CharField(max_length=100)

    def __str__(self):
        return self.title
