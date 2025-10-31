# 创建环境
conda env create -f environment.yml
# or
conda create -n postgres-env python=3.10 pip -y
conda activate postgres-env
pip install psycopg2-binary python-dotenv sqlalchemy flask pandas numpy jupyter

# 启动postgresql-test服务
# 默认有三个用户：admin@admin_pwd, user1@user1_pwd, user2@user2_pwd

# 测试访问
python main.py