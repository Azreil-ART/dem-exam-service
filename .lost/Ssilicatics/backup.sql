PGDMP  2            
        |            postgres    16.3    16.3 %    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     |   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4815                        2615    16769    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    6            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    6                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            �           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    16790    Comment    TABLE     u   CREATE TABLE public."Comment" (
    id integer NOT NULL,
    text text NOT NULL,
    "zayavkaId" integer NOT NULL
);
    DROP TABLE public."Comment";
       public         heap    postgres    false    6            �            1259    16789    Comment_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Comment_id_seq";
       public          postgres    false    221    6            �           0    0    Comment_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;
          public          postgres    false    220            �            1259    16780    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    "fullName" text NOT NULL,
    role text DEFAULT 'Клиент'::text NOT NULL,
    organization text NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    token text NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    6            �            1259    16779    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    6    219            �           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    218            �            1259    16771    Zayavka    TABLE     !  CREATE TABLE public."Zayavka" (
    id integer NOT NULL,
    equipment text NOT NULL,
    "clientId" integer NOT NULL,
    description text NOT NULL,
    "issueType" text NOT NULL,
    "executorId" integer,
    status text NOT NULL,
    "createdAt" timestamp(6) with time zone NOT NULL
);
    DROP TABLE public."Zayavka";
       public         heap    postgres    false    6            �            1259    16770    Zayavka_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Zayavka_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Zayavka_id_seq";
       public          postgres    false    217    6            �           0    0    Zayavka_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Zayavka_id_seq" OWNED BY public."Zayavka".id;
          public          postgres    false    216            (           2604    16793 
   Comment id    DEFAULT     l   ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);
 ;   ALTER TABLE public."Comment" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            &           2604    16783    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            %           2604    16774 
   Zayavka id    DEFAULT     l   ALTER TABLE ONLY public."Zayavka" ALTER COLUMN id SET DEFAULT nextval('public."Zayavka_id_seq"'::regclass);
 ;   ALTER TABLE public."Zayavka" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �          0    16790    Comment 
   TABLE DATA           :   COPY public."Comment" (id, text, "zayavkaId") FROM stdin;
    public          postgres    false    221   ''       �          0    16780    User 
   TABLE DATA           \   COPY public."User" (id, "fullName", role, organization, login, password, token) FROM stdin;
    public          postgres    false    219   D'       �          0    16771    Zayavka 
   TABLE DATA           {   COPY public."Zayavka" (id, equipment, "clientId", description, "issueType", "executorId", status, "createdAt") FROM stdin;
    public          postgres    false    217   a'       �           0    0    Comment_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Comment_id_seq"', 1, false);
          public          postgres    false    220            �           0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 1, false);
          public          postgres    false    218            �           0    0    Zayavka_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Zayavka_id_seq"', 1, false);
          public          postgres    false    216            0           2606    16797    Comment Comment_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Comment" DROP CONSTRAINT "Comment_pkey";
       public            postgres    false    221            -           2606    16788    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    219            *           2606    16778    Zayavka Zayavka_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Zayavka"
    ADD CONSTRAINT "Zayavka_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Zayavka" DROP CONSTRAINT "Zayavka_pkey";
       public            postgres    false    217            1           1259    16800    Comment_text_key    INDEX     O   CREATE UNIQUE INDEX "Comment_text_key" ON public."Comment" USING btree (text);
 &   DROP INDEX public."Comment_text_key";
       public            postgres    false    221            +           1259    16798    User_login_key    INDEX     K   CREATE UNIQUE INDEX "User_login_key" ON public."User" USING btree (login);
 $   DROP INDEX public."User_login_key";
       public            postgres    false    219            .           1259    16799    User_token_key    INDEX     K   CREATE UNIQUE INDEX "User_token_key" ON public."User" USING btree (token);
 $   DROP INDEX public."User_token_key";
       public            postgres    false    219            4           2606    16811    Comment Comment_zayavkaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_zayavkaId_fkey" FOREIGN KEY ("zayavkaId") REFERENCES public."Zayavka"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public."Comment" DROP CONSTRAINT "Comment_zayavkaId_fkey";
       public          postgres    false    221    217    4650            2           2606    16801    Zayavka Zayavka_clientId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Zayavka"
    ADD CONSTRAINT "Zayavka_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Zayavka" DROP CONSTRAINT "Zayavka_clientId_fkey";
       public          postgres    false    219    4653    217            3           2606    16806    Zayavka Zayavka_executorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Zayavka"
    ADD CONSTRAINT "Zayavka_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public."Zayavka" DROP CONSTRAINT "Zayavka_executorId_fkey";
       public          postgres    false    219    4653    217            �      x������ � �      �      x������ � �      �      x������ � �     