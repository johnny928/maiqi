package maiqi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class) //使用junit4进行测试  
@ContextConfiguration(locations={"classpath:spring/*.xml","classpath:mybatis/mybatis-config.xml","classpath:mybatis/mapper/*.xml"}) //加载配置文件   
@WebAppConfiguration
@Transactional(transactionManager="txManager")
@Rollback(value=false)
public class BaseJunit4Test {
	
	@Test
	public void test(){
	}
}
