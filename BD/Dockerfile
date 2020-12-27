FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 1234  
ENV MYSQL_DATABASE proyecto  
ENV MYSQL_USER admin 
ENV MYSQL_PASSWORD admin

ADD CreateTable.sql /docker-entrypoint-initdb.d

# Expone la aplicación en el puerto 80
EXPOSE 3306
CMD ["--default-authentication-plugin=mysql_native_password"]