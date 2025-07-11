from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import BusinessUser
from .serializers import BusinessUserSerializer

@api_view(['GET', 'POST'])
def business_user_list(request):
    if request.method == 'GET':
        users = BusinessUser.objects.all()
        serializer = BusinessUserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BusinessUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def business_user_delete(request, pk):
    try:
        user = BusinessUser.objects.get(pk=pk)
    except BusinessUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
