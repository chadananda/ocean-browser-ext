if(!JSZip)throw"JSZip not defined";(function(){function b(){this.next=null,this.list=null}function l(){this.e=0,this.b=0,this.n=0,this.t=null}function a(m,t,n,s,d,e){this.BMAX=16,this.N_MAX=288,this.status=0,this.root=null,this.m=0;{var A,a,B,f,g,h,i,j,k,p,C,q,w,D,y,z,o,E=Array(this.BMAX+1),c=Array(this.BMAX+1),F=new l,r=Array(this.BMAX),u=Array(this.N_MAX),v=Array(this.BMAX+1);for(o=this.root=null,h=0;h<E.length;h++)E[h]=0;for(h=0;h<c.length;h++)c[h]=0;for(h=0;h<r.length;h++)r[h]=null;for(h=0;h<u.length;h++)u[h]=0;for(h=0;h<v.length;h++)v[h]=0;a=256<t?m[256]:this.BMAX,k=m,p=0,h=t;do E[k[p]]++,p++;while(0<--h);if(E[0]==t)return this.root=null,this.m=0,void(this.status=0);for(i=1;i<=this.BMAX&&!(0!=E[i]);i++);for(j=i,e<i&&(e=i),h=this.BMAX;0!=h&&!(0!=E[h]);h--);for(f=h,e>h&&(e=h),D=1<<i;i<h;i++,D<<=1)if(0>(D-=E[i]))return this.status=2,void(this.m=e);if(0>(D-=E[h]))return this.status=2,void(this.m=e);for(E[h]+=D,v[1]=i=0,k=E,p=1,w=2;0<--h;)v[w++]=i+=k[p++];k=m,p=0,h=0;do 0!=(i=k[p++])&&(u[v[i]++]=h);while(++h<t);for(t=v[f],v[0]=h=0,k=u,p=0,g=-1,q=c[0]=0,C=null,y=0;j<=f;j++)for(A=E[j];0<A--;){for(;j>q+c[1+g];){if(q+=c[1+g],g++,y=(y=f-q)>e?e:y,(B=1<<(i=j-q))>A+1)for(B-=A+1,w=j;++i<y&&!((B<<=1)<=E[++w]);)B-=E[w];for(q+i>a&&q<a&&(i=a-q),y=1<<i,c[1+g]=i,C=Array(y),z=0;z<y;z++)C[z]=new l;o=null==o?this.root=new b:o.next=new b,o.next=null,o.list=C,r[g]=C,0<g&&(v[g]=h,F.b=c[g],F.e=16+i,F.t=C,i=(h&(1<<q)-1)>>q-c[g],r[g-1][i].e=F.e,r[g-1][i].b=F.b,r[g-1][i].n=F.n,r[g-1][i].t=F.t)}for(F.b=j-q,p>=t?F.e=99:k[p]<n?(F.e=256>k[p]?16:15,F.n=k[p++]):(F.e=d[k[p]-n],F.n=s[k[p++]-n]),B=1<<j-q,i=h>>q;i<y;i+=B)C[i].e=F.e,C[i].b=F.b,C[i].n=F.n,C[i].t=F.t;for(i=1<<j-1;0!=(h&i);i>>=1)h^=i;for(h^=i;(h&(1<<q)-1)!=v[g];)q-=c[g],g--}this.m=c[1],this.status=0!=D&&1!=f?1:0}}function c(){return D.length==E?-1:255&D.charCodeAt(E++)}function d(a){for(;u<a;)t|=c()<<u,u+=8}function f(a){return t&K[a]}function g(a){t>>=a,u-=a}function e(a,b,c){var h,e,i;if(0==c)return 0;for(i=0;;){for(d(B),e=z.list[f(B)],h=e.e;16<h;){if(99==h)return-1;g(e.b),h-=16,d(h),e=e.t[f(h)],h=e.e}if(g(e.b),16==h){if(q&=F-1,a[b+i++]=p[q++]=e.n,i==c)return c;continue}if(15==h)break;for(d(h),x=e.n+f(h),g(h),d(C),e=A.list[f(C)],h=e.e;16<h;){if(99==h)return-1;g(e.b),h-=16,d(h),e=e.t[f(h)],h=e.e}for(g(e.b),d(h),y=q-e.n-f(h),g(h);0<x&&i<c;)x--,y&=F-1,q&=F-1,a[b+i++]=p[q++]=p[y++];if(i==c)return c}return v=-1,i}function h(a,b,c){var e;if(e=7&u,g(e),d(16),e=f(16),g(16),d(16),e!=(65535&~t))return-1;for(g(16),x=e,e=0;0<x&&e<c;)x--,q&=F-1,d(8),a[b+e++]=p[q++]=f(8),g(8);return 0==x&&(v=-1),e}function j(b,c,d){if(null==J){var f,g,h=Array(288);for(f=0;144>f;f++)h[f]=8;for(;256>f;f++)h[f]=9;for(;280>f;f++)h[f]=7;for(;288>f;f++)h[f]=8;if(s=7,g=new a(h,288,257,L,M,s),0!=g.status)return alert("HufBuild error: "+g.status),-1;for(J=g.root,s=g.m,f=0;30>f;f++)h[f]=5;if(o=5,g=new a(h,30,0,N,O,o),1<g.status)return J=null,alert("HufBuild error: "+g.status),-1;r=g.root,o=g.m}return z=J,A=r,B=s,C=o,e(b,c,d)}function k(b,c,k){var m,i,j,l,n,o,p,q,r,h=Array(316);for(m=0;m<h.length;m++)h[m]=0;if(d(5),p=257+f(5),g(5),d(5),q=1+f(5),g(5),d(4),o=4+f(4),g(4),286<p||30<q)return-1;for(i=0;i<o;i++)d(3),h[P[i]]=f(3),g(3);for(;19>i;i++)h[P[i]]=0;if(B=7,r=new a(h,19,19,null,null,B),0!=r.status)return-1;for(z=r.root,B=r.m,l=p+q,m=j=0;m<l;)if(d(B),n=z.list[f(B)],i=n.b,g(i),i=n.n,16>i)h[m++]=j=i;else if(16==i){if(d(2),i=3+f(2),g(2),m+i>l)return-1;for(;0<i--;)h[m++]=j}else if(17==i){if(d(3),i=3+f(3),g(3),m+i>l)return-1;for(;0<i--;)h[m++]=0;j=0}else{if(d(7),i=11+f(7),g(7),m+i>l)return-1;for(;0<i--;)h[m++]=0;j=0}if(B=H,r=new a(h,p,257,L,M,B),0==B&&(r.status=1),0!=r.status){if(1==r.status);return-1}for(z=r.root,B=r.m,m=0;m<q;m++)h[m]=h[m+p];if(C=I,r=new a(h,q,0,N,O,C),A=r.root,C=r.m,0==C&&257<p)return-1;if(1==r.status);return 0==r.status?e(b,c,k):-1}function m(){null==p&&(p=Array(2*F)),q=0,t=0,u=0,v=-1,w=!1,x=y=0,z=null}function n(a,b,c){var l,m;for(l=0;l<c;){if(w&&-1==v)return l;if(0<x){if(v!=G)for(;0<x&&l<c;)x--,y&=F-1,q&=F-1,a[b+l++]=p[q++]=p[y++];else{for(;0<x&&l<c;)x--,q&=F-1,d(8),a[b+l++]=p[q++]=f(8),g(8);0==x&&(v=-1)}if(l==c)return l}if(-1==v){if(w)break;d(1),0!=f(1)&&(w=!0),g(1),d(2),v=f(2),g(2),z=null,x=0}switch(v){case 0:m=h(a,b+l,c-l);break;case 1:m=null==z?j(a,b+l,c-l):e(a,b+l,c-l);break;case 2:m=null==z?k(a,b+l,c-l):e(a,b+l,c-l);break;default:m=-1;}if(-1==m)return w?0:-1;l+=m}return l}function i(a){var b,c,d,e;for(m(),D=a,E=0,c=Array(1024),b="";0<(d=n(c,0,c.length));)for(e=0;e<d;e++)b+=String.fromCharCode(c[e]);return D=null,b}var o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F=32768,G=0,H=9,I=6,J=null,K=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],L=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],M=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],N=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],O=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],P=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];JSZip.compressions.DEFLATE?JSZip.compressions.DEFLATE.uncompress=i:JSZip.compressions.DEFLATE={magic:"\b\0",uncompress:i}})();