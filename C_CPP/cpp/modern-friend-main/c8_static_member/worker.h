#ifndef WORKER_H
#define WORKER_H
#include <string>
#include <iostream>
#include <string_view>
#include "person.h"

class Worker : public Person
{
    friend std::ostream &operator<<(std::ostream &out, const Worker &worker);

public:
    Worker()
    {
        ++m_count;
    };
    Worker(std::string_view job);
    Worker(std::string_view job, int age);
    Worker(std::string_view name, std::string_view address, std::string_view job, int age);
    Worker(const Worker &source);
    ~Worker();
    // Getter
    std::string get_job() const
    {
        return m_job;
    }
    /**
     * @note
     * Worker 中重新声明了静态变量 m_count，
     * 则使用 Worker 调用的 m_count 是它自己的 m_count，而不是 Person 类的
     */
    static int m_count;

private:
    std::string m_job{"None"};
};

#endif