#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <thread>
#include <chrono>
#include <cstdlib>
#include <ctime>
#include "json.hpp"
#include <filesystem>
#include <iomanip>

using json = nlohmann::json;
namespace fs = std::filesystem;

struct Team {
    std::string name;
    int score;
    std::string status;
    int uptime;
};

std::map<std::string, Team> loadConfig(const std::string& filename) {
    std::ifstream file(filename);
    std::map<std::string, Team> scoreboard;

    if (!file.is_open()) {
        std::cerr << "⚠ Could not open config file!" << std::endl;
        return scoreboard;
    }

    json config;
    file >> config;

    for (auto& [key, value] : config["teams"].items()) {
        scoreboard[key] = { value["name"], value["score"], value["status"], 0 };
    }

    return scoreboard;
}

void logEvent(const std::string& message) {
    std::ofstream log("log.txt", std::ios::app);
    auto now = std::time(nullptr);
    log << "[" << std::put_time(std::localtime(&now), "%F %T") << "] " << message << "\n";
}

void writeScores(const std::map<std::string, Team>& scoreboard) {
    std::ofstream outfile("web/scores.json");
    if (!outfile.is_open()) {
        std::cerr << "⚠ Failed to write scores.json" << std::endl;
        return;
    }

    json j;
    j["lastUpdated"] = std::time(nullptr);
    for (const auto& [key, team] : scoreboard) {
        j["teams"].push_back({
            {"name", team.name},
            {"score", team.score},
            {"status", team.status},
            {"uptime", team.uptime}
        });
    }

    outfile << j.dump(4);
    std::cout << "✔ scores.json updated." << std::endl;
}

void updateScores(std::map<std::string, Team>& scoreboard) {
    for (auto& [key, team] : scoreboard) {
        int change = rand() % 5 - 2; // -2 to +2
        team.score += change * 5;

        int s = rand() % 10;
        if (s < 6) {
            team.status = "Up";
            team.uptime += 10;
        } else if (s < 9) {
            team.status = "Down";
        } else {
            team.status = "Offline";
        }
    }
}

void checkInjects(std::map<std::string, Team>& scoreboard) {
    if (!fs::exists("injects")) return;
    for (const auto& entry : fs::directory_iterator("injects")) {
        std::ifstream file(entry.path());
        std::string team, action;
        int points;
        file >> team >> action >> points;

        if (scoreboard.count(team)) {
            if (action == "add") scoreboard[team].score += points;
            else if (action == "deduct") scoreboard[team].score -= points;

            logEvent("Inject applied to " + team + ": " + action + " " + std::to_string(points));
        }
        fs::remove(entry.path());
    }
}

int main() {
    srand(time(nullptr));

    std::map<std::string, Team> scoreboard = loadConfig("config/teams.json");
    if (scoreboard.empty()) return 1;

    logEvent("🏁 ATLANTIS Scoreboard started");

    while (true) {
        scoreboard = loadConfig("config/teams.json"); // dynamic reload
        updateScores(scoreboard);
        checkInjects(scoreboard);
        writeScores(scoreboard);
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }

    return 0;
}
