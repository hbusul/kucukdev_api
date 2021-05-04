# CMake
SWIG = swig
PY = /usr/local/include/python3.8

all: _scheduler.so  scheduler.py

# wrapper + real class
_scheduler.so:  scheduler_wrap.o  scheduler.o
	g++ -shared  scheduler_wrap.o  scheduler.o -O2 -o _scheduler.so -fPIC

# generated class wrapper module
 scheduler_wrap.o:  scheduler_wrap.cxx  scheduler.h
	g++  scheduler_wrap.cxx -c -g -I$(PY)/include/python3.8 -I$(PY) -fPIC

 scheduler_wrap.cxx:  scheduler.i
	$(SWIG) -c++ -python -shadow  scheduler.i

 scheduler.py:  scheduler.i
	$(SWIG) -c++ -python -shadow  scheduler.i

# wrapped C++ class code
 scheduler.o:  scheduler.cpp  scheduler.h
	g++ -c -g  scheduler.cpp -fPIC -O2

clean:
	rm -f *.pyc *.o *.so core a.out  scheduler.py  scheduler_wrap.cxx  scheduler_wrap.doc
	rm __pycache__ -fr
