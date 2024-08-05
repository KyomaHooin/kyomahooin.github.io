
DESCRIPTION

Personal "Github Pages" blog with Jekyll. SCSS skin by b2a3e8 (c) 2018.

Apache Auth Basic
<pre>
cd /etc/apache2
htpasswd -cbB auth sensei "cleartext"
</pre>

<pre>
Options	-Indexes
AllowOverride None
AuthName "さくら通信"
AuthType Basic
AuthBasicProvider file
AuthUserFile "/etc/apache2/auth"
Require user sensei
</pre>

SOURCE

https://github.com/KyomaHooin/kyomahooin.github.io

