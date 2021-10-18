package org.tristan.mediaserver.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.transaction.support.TransactionTemplate;
import org.tristan.mediaserver.repository.MediaRepository;
import org.tristan.mediaserver.util.MediaProcessor;

@EnableScheduling
@Configuration
//@EnableConfigurationProperties({ WemModuleProperties.class })
public class SchedulerConfig implements SchedulingConfigurer {

  private final MediaRepository repository;

  private final TransactionTemplate tx;

  public SchedulerConfig(MediaRepository repository, TransactionTemplate tx) {
    this.repository = repository;
    this.tx = tx;
  }

  @Override
  public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
    Trigger trigger = triggerContext -> new CronTrigger("*/1 * * ? * *").nextExecutionTime(triggerContext);
    taskRegistrar.addTriggerTask(new MediaProcessor(repository, tx), trigger);
  }

}
