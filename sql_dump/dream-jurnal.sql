PGDMP     8    2                z           dream-jurnal    13.2    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    41111    dream-jurnal    DATABASE     r   CREATE DATABASE "dream-jurnal" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "dream-jurnal";
                postgres    false            p           1247    41113    dream_dream_type_enum    TYPE     ?   CREATE TYPE public.dream_dream_type_enum AS ENUM (
    'normal dream',
    'daydreams',
    'lucid dreams',
    'false awakening dreams',
    'nightmares'
);
 (   DROP TYPE public.dream_dream_type_enum;
       public          postgres    false            ?            1259    41125    dream    TABLE     ?  CREATE TABLE public.dream (
    dream_id integer NOT NULL,
    dream_name text NOT NULL,
    dream_type public.dream_dream_type_enum DEFAULT 'normal dream'::public.dream_dream_type_enum NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    description text NOT NULL,
    date date NOT NULL
);
    DROP TABLE public.dream;
       public         heap    postgres    false    624    624            ?            1259    41123    dream_dream_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.dream_dream_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dream_dream_id_seq;
       public          postgres    false    201            ?           0    0    dream_dream_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.dream_dream_id_seq OWNED BY public.dream.dream_id;
          public          postgres    false    200            &           2604    41128    dream dream_id    DEFAULT     p   ALTER TABLE ONLY public.dream ALTER COLUMN dream_id SET DEFAULT nextval('public.dream_dream_id_seq'::regclass);
 =   ALTER TABLE public.dream ALTER COLUMN dream_id DROP DEFAULT;
       public          postgres    false    200    201    201            ?          0    41125    dream 
   TABLE DATA           l   COPY public.dream (dream_id, dream_name, dream_type, created_at, updated_at, description, date) FROM stdin;
    public          postgres    false    201   q       ?           0    0    dream_dream_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.dream_dream_id_seq', 17, true);
          public          postgres    false    200            +           2606    41136 $   dream PK_94e15df0b8eae936d176c5bdb53 
   CONSTRAINT     j   ALTER TABLE ONLY public.dream
    ADD CONSTRAINT "PK_94e15df0b8eae936d176c5bdb53" PRIMARY KEY (dream_id);
 P   ALTER TABLE ONLY public.dream DROP CONSTRAINT "PK_94e15df0b8eae936d176c5bdb53";
       public            postgres    false    201            ?     x???1N?0???=E/P?vl'??XXY
}RA?'nO$?CBu??ӟ?S?8??}??oö~m???:02?Xf҉l!]Ts?TZ?i_?ߧ#????Q? bϭ :<??????6??(???KB?BQ???|;???`d??Y?? wԳ??R ?.? ?S+?wYSn?  ?ֻr$?R$P?P?$>?I?	?#(BJ??[)R?PrJ?Z)ζ?g?$?rpW?R$h??P_1/?	]]????R$?m?/l:???R <?8?ߟ&W?     