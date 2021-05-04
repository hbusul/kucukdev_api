#include "scheduler.h"

std::vector<std::map<int, int>> map(
    std::map<int, std::map<int, std::vector<std::pair<int, int>>>> m) {
  // assume that lessons are 0 indexed
  // assume that sections are 0 indexed

  int maxCollisions = 3;

  std::vector<std::map<int, int>> schedules;
  std::map<std::pair<int, int>, int> collisionTable;
  std::map<int, int> lastSchedule;

  for (auto lessonSection : m) {
    lastSchedule[lessonSection.first] = 0;
    for (auto slot : lessonSection.second[0]) {
      if (collisionTable.find(slot) == collisionTable.end())
        collisionTable[slot] = 0;
      collisionTable[slot] += 1;
    }
  }
  int countCollisions = 0;
  for (const auto &element : collisionTable) {
    countCollisions += element.second - 1;
  }

  auto numLessons = m.size();
  bool endReached = false;
  while (true) {
    std::cout << "run" << std::endl;
    if (countCollisions < maxCollisions) {
      schedules.push_back(lastSchedule);
    }
    lastSchedule[numLessons - 1] += 1;
    for (int i = numLessons - 1; i >= 0; i--) {
      int lessonSection = lastSchedule[i];
      if (m[i].size() <= lessonSection) {
        lastSchedule[i] = 0;
        if (i > 0) {
          lastSchedule[i - 1] += 1;
        } else {
          endReached = true;
          break;
        }
      } else {
        // lesson i, section lessonSection -1 was deleted
        // lesson i, section lessonSection was added
        auto pairOld = std::make_pair(i, lessonSection - 1);
        auto pairNew = std::make_pair(i, lessonSection);
        collisionTable[pairOld] -= 1;
        if (collisionTable[pairOld] > 0) countCollisions -= 1;
        if (collisionTable.find(pairNew) == collisionTable.end())
          collisionTable[pairNew] = 0;
        collisionTable[pairNew] += 1;
        if (collisionTable[pairNew] > 1) countCollisions += 1;
        lastSchedule[i] = lessonSection;
        break;
      }
    }
    if (endReached) break;
  }

  for (const auto &schedule : schedules) {
    std::cout << "------"
              << "\n";
    for (const auto &lessonSection : schedule) {
      std::cout << lessonSection.first << ": " << lessonSection.second << "\n";
    }
    std::cout << std::endl;
  }

  return schedules;
}

// Sabaha yakinlik, aksama yakinlik, gun icindeki bosluk, gun bosaltma

// Inputlar neler, outputlar neler, kisitlar neler
// std::map (keys: gun, saat) output(ders code vectoru)