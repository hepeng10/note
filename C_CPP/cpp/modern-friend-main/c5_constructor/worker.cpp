#include "person.h"
#include "worker.h"

Worker::Worker(std::string_view job)
    : m_job(job)
{
}

Worker::Worker(std::string_view job, int age)
    : m_job(job)
{
    m_age = age;
    // m_address = "dd"; // 私有和受保护 私有不会被继承
}
/**
 * @note 调用父类构造函数，传入接收的参数（name, age, address），
 * 以及自身的初始化列表 m_job(job)
 */
Worker::Worker(std::string_view name, std::string_view address, std::string_view job, int age)
    : Person(name, age, address), m_job(job)
{
    std::cout << "Worker Constructor" << std::endl;
}
/**
 * @note 调用父类拷贝构造函数，传入接收的参数（source），
 * 以及自身的初始化列表 m_job(source.m_job)
 * 这里接收 Worker 类型的对象，用对象的对应属性进行赋值
 */
Worker::Worker(const Worker &source) : Person(source), m_job(source.m_job)
{
    std::cout << "Worker copy Constructor" << std::endl;
}

std::ostream &operator<<(std::ostream &out, const Worker &worker)
{
    out << "Worker name : " << worker.get_name() << ", Age: " << worker.get_age() << ", Job: " << worker.get_job() << ", Address: " << worker.get_address()
        << std::endl;
    return out;
}
/**
 * @note 子类析构函数先执行
 */
Worker::~Worker()
{
    std::cout << "Worker Constructor" << std::endl;
}
