#include <iostream>
#include <fstream>
#include <chrono>
#include <thread>
#include <vector>
#include "json.hpp"

using json = nlohmann::json;
#include <string>
struct Team {
    std::string name;
    std::string ip;
};

struct Service {
    std::string name;
    int port;
    std::string protocol;
};

std::vector<Team> loadTeams() {
    return {{"Red Team", "192.168.1.101"}, {"Blue Team", "192.168.1.102"}};
}

std::vector<Service> loadServices() {
    return {{"SSH", 22, "tcp"}, {"HTTP", 80, "tcp"}};
}

int performCheck(const Team& team, const Service& svc) {
    // Simulated check – replace with actual logic later
    return (team.name.length() + svc.name.length()) % 2 == 0 ? 10 : 0;
}

void generateScoreboard(const std::vector<Team>& teams, const std::vector<Service>& services) {
    json scoreboard;
    scoreboard["lastUpdated"] = std::time(nullptr);  // current UNIX timestamp
    scoreboard["teams"] = json::array();

    for (const auto& team : teams) {
        if (team.name == "Red Team") {
            // Red Team is visible but not scored
            scoreboard["teams"].push_back({
                {"name", team.name},
                {"score", nullptr},
                {"status", "Offline"},
                {"uptime", 0}
            });
            continue;
        }

        int score = 0;
        for (const auto& svc : services) {
            score += performCheck(team, svc);
        }

        scoreboard["teams"].push_back({
            {"name", team.name},
            {"score", score},
            {"status", "Up"},        // hardcoded for now
            {"uptime", 300}          // simulated uptime
        });
    }

    std::ofstream o("web/scores.json");
    o << scoreboard.dump(4);
}



int main() {
    auto teams = loadTeams();
    auto services = loadServices();

    while (true) {
        generateScoreboard(teams, services);
        std::cout << "Scoreboard updated.\n";
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }

    return 0;
}
