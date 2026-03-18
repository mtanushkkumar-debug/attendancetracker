package com.attendance.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(Application.class, args);
		Environment env = ctx.getEnvironment();
		System.out.println("[config] spring.data.mongodb.uri=" + env.getProperty("spring.data.mongodb.uri"));
	}

}
