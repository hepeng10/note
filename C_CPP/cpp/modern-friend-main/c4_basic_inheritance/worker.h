#ifndef WORKER_H
#define WORKER_H
#include <string>
#include <iostream>
#include <string_view>
#include "person.h"
/**
 * @note 派生类 Worker 继承自基类 Person
 * 使用 public 继承
 */
class Worker : public Person
{
    friend std::ostream &operator<<(std::ostream &out, const Worker &worker);

public:
    Worker() = default;
    Worker(std::string_view job);
    Worker(std::string_view job, int age);
    // Getter
    std::string get_job() const
    {
        return m_job;
    }

private:
    std::string m_job{"None"};
};

#endif