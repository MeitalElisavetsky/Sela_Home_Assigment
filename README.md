CI/CD Pipelines with GitHub Actions

This project has CI/CD workflows using GitHub Actions to automate the process of building a node.js application, testing the app, building the application and publishing it to Docker Hub as asked. The workflows are defined in `ci.yaml` and `deploy.yaml` files. 

CI Pipeline (`ci.yaml`)

The `ci.yaml` file consists of three jobs: `build`, `build_docker_image`, and `deploy`.

Workflow Triggers

The CI pipeline is triggered by:
- Push events to the `main` branch.
- Pull request events targeting the `main` branch with types: `opened`, `synchronize`, and `reopened`.

Jobs

1. Build

The `build` job performs the following steps:
1. **Checkout repository**: Uses the `actions/checkout@v2` action to clone the repository.
2. **Set up Node.js**: Uses the `actions/setup-node@v3` action to set up Node.js with versions specified in the matrix (`12.x, 14.x, 16.x, 18.x`).
3. **Install dependencies**: Runs `npm install` to install the project dependencies for each version.
4. **Run tests**: Executes `npm test` to run the test the application.

2. Build Docker Image

The `build_docker_image` job depends on the successful completion of the `build` job. It includes the following steps:
1. **Checkout repository**: Uses the `actions/checkout@v2` action to clone the repository again.
2. **Set Up Docker Buildx**: Uses `docker/setup-buildx-action@v1` to set up Docker Buildx, a tool for building Docker images.
3. **Build Docker image**: Runs `docker build -t ${{ secrets.DOCKER_USERNAME }}/am-israel-hai .` to build the Docker image.
4. **Log in to Docker Hub**: Logs into Docker Hub using the `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets.
5. **Push Docker image**: Pushes the Docker image to Docker Hub if the workflow is running on the `main` branch because I didn't want the image being pushed when adding a feature that it's not totally integrated in the future.

3. Deploy

The `deploy` job depends on the successful completion of the `build_docker_image` job and runs only if the workflow is triggered on the `main` branch. It uses the `deploy.yaml` workflow to handle the deployment process.

Deploy Workflow (`deploy.yaml`)

The `deploy.yaml` file defines the deployment workflow, which is called by the `deploy` job in `ci.yaml`.

Workflow Trigger

The deploy workflow is triggered by a workflow call from another workflow (`ci.yaml` in this case).

Jobs

Deploy

The `deploy` job consists of the following steps:
1. **Checkout repository**: Uses the `actions/checkout@v2` action to clone the repository.
2. **Print deploy message**: Runs a simple echo command to print a deployment message (this step can be replaced with actual deployment commands).

Instructions

1. Set Up Repository Secret: Ensure that the repository has the following secrets configured:
   - `DOCKER_USERNAME`: User's Docker Hub username.
   - `DOCKER_PASSWORD`: User's Docker Hub password.

2. Push to `main` Branch: Pushing changes to the `main` branch or opening/synchronizing/reopening pull requests targeting the `main` branch will trigger the CI pipeline.

3. Review Docker Image: After a successful build, the Docker image will be pushed to Docker Hub under your username that was called in the secret with the repository name `am-israel-hai` or however you would like to call it.

5. Deployment: Deployment will be triggered automatically after the Docker image is successfully built and pushed, provided the workflow is running on the `main` branch.

<img width="1680" alt="Screenshot 2024-06-04 at 0 24 32" src="https://github.com/MeitalElisavetsky/nodejs-docker-ci-cd/assets/142781353/ca1ffa5d-73af-4883-8530-5c2e5e599c1e">

