PGDMP  ,    .            
    |         
   collab_app    16.4 (Debian 16.4-1.pgdg120+2)    16.4 (Homebrew)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16389 
   collab_app    DATABASE     u   CREATE DATABASE collab_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
    DROP DATABASE collab_app;
                collab_app_user    false                       0    0 
   collab_app    DATABASE PROPERTIES     3   ALTER DATABASE collab_app SET "TimeZone" TO 'utc';
                     collab_app_user    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                collab_app_user    false           