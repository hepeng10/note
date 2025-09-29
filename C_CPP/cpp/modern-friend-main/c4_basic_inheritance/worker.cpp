#include "person.h"
#include "worker.h"

Worker::Worker(std::string_view job)
    : m_job(job)
{
}
Worker::Worker(std::string_view job, int age)
    : m_job(job)
{
    /**
     * @note 父类中 protected 属性被子类继承，可以在子类中访问、修改
     */
    m_age = age;
    // m_address = "dd"; // 父类中 private 属性不会被继承，不能访问和修改
}

std::ostream &operator<<(std::ostream &out, const Worker &worker)
{
    /**
     * @note 子类中可以通过 get_address 方法访问父类中的 private 属性 m_address
     */
    out << "Worker name : " << worker.get_name() << ", Age: " << worker.get_age() << ", Job: " << worker.get_job() << ", Address: " << worker.get_address()
        << std::endl;
    return out;
}
