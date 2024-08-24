# 使用基于轻量级 Linux 的 Golang 映像
FROM golang:1.23.0-alpine

# 安装 air 热加载工具
RUN go install github.com/air-verse/air@latest

# 设置工作目录为 /app
WORKDIR /app

# 将 go.mod 和 go.sum 文件复制到工作目录
COPY go.mod go.sum ./

# 下载 Go 依赖
RUN go mod download

# 复制项目的源代码到工作目录
COPY . .

# 设置 AIR_TMP_DIR 环境变量
ENV AIR_TMP_DIR=./tmp

# 暴露应用程序的端口
EXPOSE 8080

# 切换到包含 main.go 的目录
WORKDIR /app/cmd/blog

# 设置容器启动时的命令
CMD ["air"]

#支持使用 `air` 进行热加载。以下是这个 Dockerfile 的关键点和使用说明：

### 关键点：

#1. 使用 Alpine 作为基础映像：
#   - 你选择了 `golang:1.23.0-alpine` 作为基础映像，这是一个轻量级的 Linux 发行版，非常适合容器化应用。

#2. 安装 `air` 热加载工具：
#   - 通过 `RUN go install github.com/cosmtrek/air@latest` 安装了 `air`，这是一个流行的 Go 热加载工具，可以监控代码变更并自动重新编译和启动应用程序。

#3. 设置工作目录和复制项目文件：
#   - `WORKDIR /app` 设置了容器内的工作目录，所有文件操作都将在该目录下进行。
#   - 通过 `COPY go.mod go.sum ./` 和 `RUN go mod download`，你确保了在构建时下载依赖。
#   - 之后通过 `COPY . .` 复制项目的所有源代码到容器中。

#4. 暴露端口：
#   - `EXPOSE 8080` 暴露了应用程序的默认端口，以便在 Docker 容器外部可以访问到该应用。

#5. 使用 `air` 启动：
#   - 最后通过 `CMD ["air"]`，在容器启动时运行 `air`，实现热加载功能。`air` 将监控文件的变更，并在代码发生变化时重新编译和运行应用程序。

### 使用步骤：

#1. 构建 Docker 镜像并启动容器：
#   在项目根目录下运行以下命令，构建并启动容器：
#   ```
#   docker-compose up --build
#   ```

#2. 验证热加载功能：
#   - 修改本地代码后，`air` 应该会自动重新编译并重启应用程序。你可以在终端中观察到 `air` 的输出，确认热加载是否正常工作。
### 总结：
# - 准备好开发环境：你的 Dockerfile 已经准备好了一个非常适合开发的环境，并且支持 Go 应用的热加载。
# - 持续开发：随着代码的修改，`air` 将自动重载你的应用，无需手动重启容器。
# 結束開發
# docker-compose down