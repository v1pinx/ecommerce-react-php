FROM php:8.2-apache

RUN a2enmod rewrite \
    && docker-php-ext-install mysqli pdo pdo_mysql

WORKDIR /var/www/html

COPY api/ /var/www/html/

EXPOSE 80

CMD ["apache2-foreground"]
