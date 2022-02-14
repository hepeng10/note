一、安装
Windows下：
1、首先要有PHP运行环境，可以直接安装WAMP获得
2、下载安装包安装，安装过程中会要求选择php.exe程序，在WAMP的bin目录下的php目录中
3、开始使用，无需手动配置环境变量，安装过程中已自动配置

Mac下：
使用homebrew进行安装
brew update
brew tap josegonzalez/homebrew-php
brew tap homebrew/versions
brew install php55-intl
brew install josegonzalez/php/composer

二、切换中国镜像
由于墙的原因，安装完成后需要切换到中国镜像才能方便的使用
在命令行中运行以下内容即可切换到中国镜像
composer config -g repositories.packagist composer http://packagist.phpcomposer.com

三、使用
composer和nodeJS类似，也是使用一个JSON文件来记录依赖关系
在项目目录中使用composer.json文件来记录依赖关系，内容如：
{
    "name": "laravel/laravel",
    "description": "The Laravel Framework.",
    "keywords": ["framework", "laravel"],
    "license": "MIT",
    "type": "project",
    "require": {
        "php": ">=5.5.9",
        "laravel/framework": "5.1.*"
    },
    "require-dev": {
        "fzaninotto/faker": "~1.4",
        "mockery/mockery": "0.9.*",
        "phpunit/phpunit": "~4.0",
        "phpspec/phpspec": "~2.1"
    },
    "autoload": {
        "classmap": [
            "database"
        ],
        "psr-4": {
            "App\\": "app/"
        }
    },
    "autoload-dev": {
        "classmap": [
            "tests/TestCase.php"
        ]
    },
    "scripts": {
        "post-install-cmd": [
            "php artisan clear-compiled",
            "php artisan optimize"
        ],
        "pre-update-cmd": [
            "php artisan clear-compiled"
        ],
        "post-update-cmd": [
            "php artisan optimize"
        ],
        "post-root-package-install": [
            "php -r \"copy('.env.example', '.env');\""
        ],
        "post-create-project-cmd": [
            "php artisan key:generate"
        ]
    },
    "config": {
        "preferred-install": "dist"
    }
}

四、下载依赖
在项目中使用以下命令下载依赖所需文件
composer install