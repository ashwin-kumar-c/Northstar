pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            reuseNode true
            args '-u 0:0'
        }
    }

    environment {
    EC2_HOST = '32.199.13.86'
    EC2_USER = 'ubuntu'
}

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm test -- --ci'
            }
        }

        stage('Code coverage') {
            steps {
                sh 'npm test -- --ci --coverage'
            }

            post {
                always {
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Code Coverage'
                    ])
                }
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit --audit-level=high'
            }
        }

        stage('Deploy frontend to EC2') {

            steps {
                sh 'apk add --no-cache openssh-client rsync'

                sshagent(credentials: ['ec2-deploy-key']) {
                    sh '''
                        mkdir -p ~/.ssh
                        ssh-keyscan -H "$EC2_HOST" >> ~/.ssh/known_hosts

                        rsync -az --delete dist/ \
                        "$EC2_USER@$EC2_HOST:/var/www/my-demo-app/"
                    '''
                }
            }
        }
    }

        post {
        always {
            archiveArtifacts artifacts: 'dist/**,coverage/**', allowEmptyArchive: true
            junit allowEmptyResults: true, testResults: 'junit.xml'
        }
        success {
            echo 'Frontend pipeline completed successfully'
        }
    }
}