%module scheduler 

%include "std_string.i"
%include "std_map.i"
%include "std_vector.i"
%include "std_pair.i"

namespace std {
    %template(int_vector) vector<int>;
    %template(pair_vector) vector<pair<int, int>>;
    %template(map_int_vector_int) map<int, vector<pair<int, int>>>;
    %template(map_map_pair_vector) map<int, map<int, vector<pair<int, int>>>>;
    %template(schedules) vector<map<int, int>>;
}

%{
#include "scheduler.h"
%}

/* list functions to be interfaced: */
std::vector<std::map<int, int>> schedule(std::map<int, std::map<int, std::vector<std::pair<int, int>>>> m);