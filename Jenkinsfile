pipeline {
    agent any

    environment {
        AWS_REGION   = "ap-south-1"
        ECR_REPO     = "799416476229.dkr.ecr.ap-south-1.amazonaws.com/nimbustasks"
        IMAGE_TAG    = "latest"
        CLUSTER_NAME = "nimbustasks-cluster"
        SERVICE_NAME = "nimbustasks-service"
        TASK_DEF_FILE = "deploy.json"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/sheelukushwaha/NimbusTasks.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Configure AWS CLI') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-creds', 
                    usernameVariable: 'AWS_ACCESS_KEY_ID', 
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    sh """
                        mkdir -p ~/.aws
                        echo "[default]" > ~/.aws/credentials
                        echo "aws_access_key_id=$AWS_ACCESS_KEY_ID" >> ~/.aws/credentials
                        echo "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" >> ~/.aws/credentials
                        echo "[default]" > ~/.aws/config
                        echo "region=${AWS_REGION}" >> ~/.aws/config
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t nimbustasks:${IMAGE_TAG} .
                    docker tag nimbustasks:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}
                """
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                    aws ecr get-login-password --region ${AWS_REGION} \
                    | docker login --username AWS --password-stdin ${ECR_REPO}
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "docker push ${ECR_REPO}:${IMAGE_TAG}"
            }
        }

        stage('Register Task Definition') {
            steps {
                sh "aws ecs register-task-definition --cli-input-json file://${TASK_DEF_FILE}"
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh """
                    aws ecs update-service \
                        --cluster ${CLUSTER_NAME} \
                        --service ${SERVICE_NAME} \
                        --force-new-deployment \
                        --region ${AWS_REGION}
                """
            }
        }
    }
}